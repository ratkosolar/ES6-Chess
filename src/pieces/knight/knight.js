import Piece from '../piece';
import { KNIGHT } from '../../constants';

class Knight extends Piece {
  constructor(color, position) {
    super(color, position, KNIGHT);
  }

  getPossibleMoves(board) {
    // Knight move directions
    const directions = [
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 }
    ];
    return this.buildPossibleMoves(board, directions);
  }
}

export default Knight;
