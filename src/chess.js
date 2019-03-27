import Pawn from './pieces/pawn';

class Chess {
  constructor(pieces = []) {
    this.pieces = pieces;
  }

  addPawn() {
    this.pieces.push(new Pawn('position'));
  }
}

export default Chess;
