import Piece from '../piece';
import { KING } from '../../constants';

class King extends Piece {
  constructor(color, position) {
    super(color, position, KING);
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

export default King;
