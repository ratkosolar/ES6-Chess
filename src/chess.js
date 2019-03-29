import { GAME_ONGOING, WHITE, DEFAULT_FEN } from './constants';
import FenParser from './fen-parser';
import Board from './board/board';
import { getPieceColor } from './utils';

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

  moves(piece = null) {
    if (piece === null) {
      return this.board.getAllLegalMoves(
        this.board.getBoard(),
        this.activeColor,
        this.enPassantTarget,
        this.castling
      );
    }

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

  move() {}

  isCheck() {}

  isCheckmate() {}
}

export default Chess;
