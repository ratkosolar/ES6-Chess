import Piece from '../piece';
import { QUEEN } from '../../constants';

class Queen extends Piece {
  constructor(color, position) {
    super(color, position, QUEEN);
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

export default Queen;
