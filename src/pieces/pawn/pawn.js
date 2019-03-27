import Piece from '../piece';
import { PAWN } from '../../constants';

class Pawn extends Piece {
  constructor(color, position) {
    super(color, position, PAWN);
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

export default Pawn;
