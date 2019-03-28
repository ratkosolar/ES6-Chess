import Piece from '../piece';
import { ROOK } from '../../constants';

class Rook extends Piece {
  constructor(color, position) {
    super(color, position, ROOK);
  }

  getPossibleMoves(board) {
    // Rook move directions
    const directions = [
      { x: 1, y: 0, loop: true },
      { x: -1, y: 0, loop: true },
      { x: 0, y: 1, loop: true },
      { x: 0, y: -1, loop: true }
    ];
    return this.buildPossibleMoves(board, directions);
  }
}

export default Rook;
