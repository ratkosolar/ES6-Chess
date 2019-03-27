import Pawn from './pieces/pawn/pawn';

class Chess {
  constructor(name = '', pieces = []) {
    this.name = name;
    this.pieces = pieces;
  }

  addPawn() {
    this.pieces.push(new Pawn('position'));
  }
}

export default Chess;
