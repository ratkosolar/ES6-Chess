import {
  GAME_ONGOING,
  WHITE,
  DEFAULT_FEN,
  CASTLE_QUEENSIDE,
  CASTLE_KINGSIDE,
  PAWN,
  BLACK,
  GAME_COMPLETE
} from './constants';
import FenParser from './fen-parser';
import Board from './board/board';
import {
  getPieceColor,
  parseBoardPosition,
  buildPieceString,
  getBoardPieceAt,
  updatePiecePosition,
  stringifyBoardPosition
} from './utils';

class Chess {
  constructor(fen = null) {
    this.info = {};
    this.history = [];
    this.status = GAME_ONGOING;

    this.board = new Board();
    this.activeColor = WHITE;
    this.enPassantTarget = null;
    this.castling = {
      K: true,
      Q: true,
      k: true,
      q: true
    };
    this.halfMoves = 0;
    this.fullMoves = 1;

    this.deadPieces = [];

    this.loadFen(fen || DEFAULT_FEN);
  }

  /**
   * Parses a FEN string and loads the data
   * @param {String} fen
   */
  loadFen(fen) {
    const fenParser = new FenParser(fen);
    if (!fenParser.isValid) {
      throw new Error(`Invalid FEN string provided ${fen}`);
    }

    const { board, activeColor, enPassantTarget, castling, halfMoves, fullMoves } = fenParser;
    this.board.setBoard(board);
    this.activeColor = activeColor;
    this.enPassantTarget = enPassantTarget;
    this.castling = castling;
    this.halfMoves = halfMoves;
    this.fullMoves = fullMoves;
  }

  /**
   * FEN stringify current game
   * @return {String} FEN string
   */
  get fen() {
    const fenParser = new FenParser();
    fenParser.board = this.board.getBoard();
    fenParser.activeColor = this.activeColor;
    fenParser.enPassantTarget = this.enPassantTarget;
    fenParser.castling = this.castling;
    fenParser.halfMoves = this.halfMoves;
    fenParser.fullMoves = this.fullMoves;
    return fenParser.stringify();
  }

  /**
   * Gets an array of legal moves for current player
   * @param {String} piece - Filter moves by piece
   * @return {Array} moves - Array of moves
   */
  moves(piece = null) {
    // If no piece, return all legal moves for current player
    if (piece === null) {
      return this.board.getAllLegalMoves(
        this.board.getBoard(),
        this.activeColor,
        this.enPassantTarget,
        this.castling
      );
    }

    // If piece color is not current player, return empty array
    if (getPieceColor(piece) !== this.activeColor) {
      return [];
    }

    return this.board.getLegalMovesForPiece(
      piece,
      this.board.getBoard(),
      this.enPassantTarget,
      this.castling
    );
  }

  /**
   * Make a chess move
   * @param {String} piece - Piece to move
   * @param {String} to - Board position
   */
  move(piece, to) {
    const color = getPieceColor(piece);
    if (color !== this.activeColor) {
      throw new Error(`Wait for your turn`);
    }

    const board = this.getBoard();
    const legalMove = this.board
      .getLegalMovesForPiece(piece, board, this.enPassantTarget, this.castling)
      .find(move => move.to === to);

    if (!legalMove) {
      throw new Error(`You can't move ${piece} to ${to}`);
    }

    // Move the piece
    const fromPos = parseBoardPosition(legalMove.from);
    const toPos = parseBoardPosition(legalMove.to);
    board[fromPos.y][fromPos.x] = null;
    board[toPos.y][toPos.x] = buildPieceString(legalMove.piece, color, legalMove.to);

    if (legalMove.capture) {
      this.deadPieces.push(legalMove.capturedPiece);
    }

    // Move the rook if castling
    if (legalMove.castle) {
      const castleRookY = color === WHITE ? 7 : 0;
      if (legalMove.castle === CASTLE_QUEENSIDE) {
        // Queen side castling
        const castleRookX = 0;
        const castleRook = getBoardPieceAt(board, castleRookX, castleRookY);
        const newRookPosition = stringifyBoardPosition(castleRookX + 3, castleRookY);
        board[castleRookY][castleRookX] = null;
        board[castleRookY][castleRookX + 3] = updatePiecePosition(castleRook, newRookPosition);
      } else if (legalMove.castle === CASTLE_KINGSIDE) {
        // King side castling
        const castleRookX = 7;
        const castleRook = getBoardPieceAt(board, 7, castleRookY);
        const newRookPosition = stringifyBoardPosition(castleRookX - 2, castleRookY);
        board[castleRookY][castleRookX] = null;
        board[castleRookY][castleRookX - 2] = updatePiecePosition(castleRook, newRookPosition);
      }
    }

    // Set new en passant target (if a pawn does a 2 step move)
    if (legalMove.piece === PAWN && Math.abs(fromPos.y - toPos.y) === 2) {
      const enPassantTargetY = color === WHITE ? fromPos.y - 1 : fromPos.y + 1;
      this.enPassantTarget = stringifyBoardPosition(fromPos.x, enPassantTargetY);
    } else {
      this.enPassantTarget = null;
    }

    // Update game state
    this.board = new Board(board);
    this.fullMoves += 1;
    this.halfMoves = Math.floor((this.fullMoves + 1) / 2);
    this.activeColor = color === WHITE ? BLACK : WHITE;
    this.status =
      this.board.getAllLegalMoves(board, this.enPassantTarget, this.castling).length !== 0
        ? GAME_ONGOING
        : GAME_COMPLETE;
  }

  /**
   * Is game complete
   * @return {Boolean} isComplete
   */
  isComplete() {
    return this.status === GAME_COMPLETE;
  }

  /**
   * Is check
   * @param {String} color - player color
   * @return {Boolean} isCheck
   */
  isCheck(color = null) {
    const board = this.board.getBoard();
    return this.board.isCheck(color === null ? this.activeColor : color, board);
  }

  /**
   * Is checkmate
   * @return {Boolean} isCheckmate
   */
  isCheckmate() {
    return this.isCheck() && this.moves().length === 0;
  }

  /**
   * Is draw
   * @return {Boolean} isDraw
   */
  isDraw() {
    return !this.isCheck() && this.moves().length === 0;
  }

  /**
   * Get board matrix
   */
  getBoard() {
    return this.board.getBoard();
  }
}

export default Chess;
