import Piece from '../piece';
import { BISHOP } from '../../constants';

class Bishop extends Piece {
  constructor(color, position) {
    super(color, position, BISHOP);
  }

  getPossibleMoves(board) {
    // Bishop move directions
    const directions = [
      { x: 1, y: 1, loop: true },
      { x: 1, y: -1, loop: true },
      { x: -1, y: 1, loop: true },
      { x: -1, y: -1, loop: true }
    ];
    return this.buildPossibleMoves(board, directions);
  }
}

export default Bishop;
