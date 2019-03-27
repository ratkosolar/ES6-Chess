import Piece from '../piece';
import { KNIGHT } from '../../constants';

class Knight extends Piece {
  constructor(color, position) {
    super(color, position, KNIGHT);
  }

  getPossibleMoves() {
    const possibleMoves = [];
    const pos = this.position;

    return [...possibleMoves, pos];
  }

  isMovePossible(dest) {
    const possibleMoves = this.getPossibleMoves();
    return possibleMoves.indexOf(dest) > -1;
  }
}

export default Knight;
