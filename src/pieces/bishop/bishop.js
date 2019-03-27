import Piece from '../piece';
import { BISHOP } from '../../constants';

class Bishop extends Piece {
  constructor(color, position) {
    super(color, position, BISHOP);
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

export default Bishop;
