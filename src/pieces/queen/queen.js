import Piece from '../piece';
import { QUEEN } from '../../constants';

class Queen extends Piece {
  constructor(color, position) {
    super(color, position, QUEEN);
  }

  getPossibleMoves(board) {
    // Queen move directions
    const directions = [
      { x: 1, y: 0, loop: true },
      { x: -1, y: 0, loop: true },
      { x: 0, y: 1, loop: true },
      { x: 0, y: -1, loop: true },
      { x: 1, y: 1, loop: true },
      { x: 1, y: -1, loop: true },
      { x: -1, y: 1, loop: true },
      { x: -1, y: -1, loop: true }
    ];
    return this.buildPossibleMoves(board, directions);
  }
}

export default Queen;
