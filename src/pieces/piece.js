import { WHITE, BLACK, CHESS_PIECE_TYPES } from '../constants';
import { parseBoardPosition } from '../utils';

class Piece {
  constructor(color, position, type) {
    this.color = color;
    this.position = position;
    this.type = type;
  }

  /**
   * Color
   */
  set color(color) {
    if (color !== WHITE && color !== BLACK) {
      throw new Error(`Invalid piece color ${color}`);
    }
    this._color = color;
  }

  get color() {
    return this._color;
  }

  /**
   * Position
   */
  set position(position) {
    const parsedPos = parseBoardPosition(position);
    if (parsedPos === null) {
      throw new Error(`Invalid piece position ${position}`);
    }
    this._position = parsedPos;
  }

  get position() {
    return this._position;
  }

  /**
   * Type
   */
  set type(type) {
    if (CHESS_PIECE_TYPES.indexOf(type) === -1) {
      throw new Error(`Invalid piece type ${type}`);
    }
    this._type = type;
  }

  get type() {
    return this._type;
  }
}

export default Piece;
