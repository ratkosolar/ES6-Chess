import Piece from '../piece';
import { ROOK } from '../../constants';

class Rook extends Piece {
  constructor(color, position) {
    super(color, position, ROOK);
  }

  getPossibleMoves(board) {
    const moveset = [
      { x: 1, y: 0, loop: true },
      { x: -1, y: 0, loop: true },
      { x: 0, y: 1, loop: true },
      { x: 0, y: -1, loop: true }
    ];
    return this.buildPossibleMoves(board, moveset);
  }
}

export default Rook;
