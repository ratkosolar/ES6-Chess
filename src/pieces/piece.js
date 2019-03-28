import { WHITE, BLACK, CHESS_PIECE_TYPES } from '../constants';
import { parseBoardPosition, stringifyBoardPosition, getPieceColor } from '../utils';

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

  /**
   * Build possible moves
   */
  buildPossibleMoves(board, directions) {
    const possibleMoves = {};
    const pos = this.position;

    // Build piece moves in all direction
    for (let i = 0, l = directions.length; i < l; i += 1) {
      const dir = directions[i];
      const loopCycleMax = dir.loop === true ? 8 : 1;
      for (let j = 1; j <= loopCycleMax; j += 1) {
        const moveX = pos.x + dir.x * j;
        const moveY = pos.y + dir.y * j;
        const movePos = stringifyBoardPosition(moveX, moveY);
        if (movePos === null) {
          // Reached invalid position, break current direction
          break;
        }

        const occupiedPiece = board[moveY][moveX];
        const isOccupied = occupiedPiece !== null;
        const isCapture = isOccupied && getPieceColor(occupiedPiece) !== this.color;

        // Move is possible if its enemy occupied or not occupied at al
        if (isCapture || !isOccupied) {
          possibleMoves[movePos] = {
            from: pos.position,
            to: movePos,
            piece: this.type,
            color: this.color,
            capture: isCapture,
            capturePiece: isCapture ? occupiedPiece : null
          };
        }

        // Break direction if occupied field reached
        if (isOccupied) {
          break;
        }
      }
    }
    return possibleMoves;
  }
}

export default Piece;
