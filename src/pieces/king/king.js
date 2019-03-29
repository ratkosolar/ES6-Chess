import Piece from '../piece';
import { KING, CASTLE_QUEENSIDE, CASTLE_KINGSIDE, WHITE } from '../../constants';
import { getBoardPieceAt } from '../../utils';

class King extends Piece {
  constructor(color, position) {
    super(color, position, KING);
  }

  getPossibleMoves(board, enPassantTarget, castling, isCheck = false) {
    // King move directions
    const moveset = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 }
    ];

    if (castling && !isCheck) {
      const pos = this.position;
      if (
        (this.color === WHITE ? castling.Q === true : castling.q === true) &&
        getBoardPieceAt(board, pos.x - 1, pos.y) === null &&
        getBoardPieceAt(board, pos.x - 2, pos.y) === null &&
        getBoardPieceAt(board, pos.x - 3, pos.y) === null
      ) {
        moveset.push({ x: -2, y: 0, type: CASTLE_QUEENSIDE });
      }
      if (
        (this.color === WHITE ? castling.K === true : castling.k === true) &&
        getBoardPieceAt(board, pos.x + 1, pos.y) === null &&
        getBoardPieceAt(board, pos.x + 2, pos.y) === null
      ) {
        moveset.push({ x: 2, y: 0, type: CASTLE_KINGSIDE });
      }
    }

    return this.buildPossibleMoves(board, moveset);
  }
}

export default King;
