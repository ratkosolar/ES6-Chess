import Piece from '../piece';
import { KING } from '../../constants';

class King extends Piece {
  constructor(color, position) {
    super(color, position, KING);
  }

  getPossibleMoves(board) {
    // King move directions
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 }
    ];
    return this.buildPossibleMoves(board, directions);
  }
}

export default King;
