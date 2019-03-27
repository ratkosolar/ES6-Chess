import Piece from '../piece';
import { ROOK } from '../../constants';

class Rook extends Piece {
  constructor(color, position) {
    super(color, position, ROOK);
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

export default Rook;
