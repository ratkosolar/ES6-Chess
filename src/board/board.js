import pieceClasses from '../pieces';
import {
  buildBoardMatrix,
  getPiecePosition,
  parseBoardPosition,
  updatePiecePosition,
  cloneBoard,
  validatePieceOnBoard,
  getPieceType,
  getPieceColor,
  buildPieceString
} from '../utils';
import { KING, WHITE, BLACK } from '../constants';

class Board {
  constructor(board) {
    this.board = board || buildBoardMatrix();
  }

  setBoard(board) {
    this.board = board;
  }

  getBoard() {
    return cloneBoard(this.board);
  }

  /**
   * Get all legal moves for player color
   * @param {Array[Array]} board - Chess board matrix
   * @param {String} playerColor - Player color
   * @param {String} enPassantTarget - En passant target field
   * @param {Object} castling - Available castlings
   */
  getAllLegalMoves(board, playerColor, enPassantTarget, castling) {
    const moves = [];
    board.forEach(row => {
      row.forEach(piece => {
        if (piece !== null && getPieceColor(piece) === playerColor) {
          moves.concat([...this.getLegalMovesForPiece(piece, board, enPassantTarget, castling)]);
        }
      });
    });
    return moves;
  }

  /**
   * Calculate all legal moves for given chess piece
   * it validates and filters all possible moves that are legal
   * @param {String} piece - Chess piece string - 'P@A4'
   * @param {Array[Array]} board - Chess board matrix
   * @param {String} enPassantTarget - En passant target field
   * @param {Object} castling - Available castlings
   */
  getLegalMovesForPiece(piece, board, enPassantTarget, castling) {
    const playerColor = getPieceColor(piece);

    // Only validate if its Check for calculating king moves to prevent castling
    const type = getPieceType(piece);
    const kingChecked = type === KING ? this.isCheck(playerColor, board) : false;

    const possibleMoves = this.getPossibleMovesForPiece(
      piece,
      board,
      enPassantTarget,
      castling,
      kingChecked
    );
    const legalMoves = Object.keys(possibleMoves)
      .map(key => possibleMoves[key])
      .filter(move => {
        const movingPiece = buildPieceString(move.piece, move.color, move.from);
        const newBoard = this.moveChessPieceOnBoard(movingPiece, board, move.to);
        return this.isCheck(playerColor, newBoard) === false;
      });
    return legalMoves;
  }

  /**
   * Calculate all possible moves for given chess piece
   * @param {String} piece - Chess piece string - 'P@A4'
   * @param {Array[Array]} board - Chess board matrix
   * @param {String} enPassantTarget - En passant target field
   * @param {Object} castling - Available castlings
   * @return {Object} possibleMoves - Object with keys as board position strings
   */
  getPossibleMovesForPiece(piece, board, enPassantTarget, castling, kingChecked) {
    if (!validatePieceOnBoard(piece, board)) {
      throw new Error(`Chess piece ${piece} doesn't match the board matrix`);
    }
    const type = getPieceType(piece);
    const color = getPieceColor(piece);
    const position = getPiecePosition(piece);

    const PieceClass = pieceClasses[type];
    const chessPiece = new PieceClass(color, position);

    const possibleMoves = chessPiece.getPossibleMoves(
      board,
      enPassantTarget,
      castling,
      kingChecked
    );
    return possibleMoves;
  }

  /**
   * Calculate all attacked fields for given chess board by a player with attackColor
   * @param {Array[Array]} board - Chess board matrix
   * @param {String} attackColor - Attacking player color
   * @return {Array} - Attacked fields array
   */
  getAttackedFields(board, attackColor) {
    let attackedFields = [];
    board.forEach(row => {
      return row
        .filter(piece => piece !== null && attackColor === getPieceColor(piece))
        .forEach(piece => {
          const pieceAttacks = this.getPossibleMovesForPiece(piece, board);
          attackedFields = [...attackedFields, ...Object.keys(pieceAttacks)];
        });
    });
    return attackedFields;
  }

  /**
   * Check if the board field is attacked by attackColor player
   * @param {String} position - Board string position - 'A4'
   * @param {String} attackColor - Color of attack player
   * @param {Array[Array]} board - Chess board matrix
   * @return {Boolean} isFieldAttacked
   */
  isFieldAttacked(position, attackColor, board) {
    const attackedFields = this.getAttackedFields(board, attackColor);
    return attackedFields.find(field => field === position) !== undefined;
  }

  /**
   * Finds position of king piece on board matrix
   * @param {String} color - King color
   * @param {Array[Array]} board - Chess board matrix
   * @return {String} - string position of king - 'A4'
   */
  getKingPosition(color, board) {
    let kingPosition = null;
    board.find(row => {
      const king = row.find(
        piece => piece !== null && getPieceType(piece) === KING && getPieceColor(piece) === color
      );
      if (king) {
        kingPosition = getPiecePosition(king);
        return true;
      }
      return false;
    });

    return kingPosition;
  }

  /**
   * Checks if the king is under check
   * @param {String} color - King color
   * @param {Array[Array]} board - Chess board matrix
   * @return {Boolean} - isCheck
   */
  isCheck(color, board) {
    const attackColor = color === WHITE ? BLACK : WHITE;
    const kingPos = this.getKingPosition(color, board);
    return this.isFieldAttacked(kingPos, attackColor, board);
  }

  /**
   * Moves chess piece to a new position on chess board
   * @param {String} piece - Chess piece string
   * @param {Array[Array]} board - Chess board matrix
   * @param {String} dest - Destination position string
   * @return {Array[Array]} - Updated board
   */
  moveChessPieceOnBoard(piece, board, dest) {
    const posString = getPiecePosition(piece);
    const pos = parseBoardPosition(posString);
    const destPos = parseBoardPosition(dest);
    const updatedPiece = updatePiecePosition(piece, dest);
    const newBoard = cloneBoard(board);
    newBoard[pos.y][pos.x] = null;
    newBoard[destPos.y][destPos.x] = updatedPiece;
    return newBoard;
  }
}

export default Board;
