import {
  WHITE,
  BLACK,
  CHESS_PIECE_TYPES,
  CASTLE_QUEENSIDE,
  CASTLE_KINGSIDE,
  BOARD_SIZE_X,
  BOARD_SIZE_Y
} from '../constants';
import { parseBoardPosition, stringifyBoardPosition, getPieceColor } from '../utils';

export const MoveCondition = {
  IsEmpty: 1,
  IsEnemyOccupiedOrEnPassant: 2
};

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
  buildPossibleMoves(board, moveset, enPassantTarget) {
    const possibleMoves = {};
    const pos = this.position;

    // Build piece moves in all direction
    moveset.forEach(move => {
      // Check if the move is looping or just once step
      const loopCount = move.loop === true ? Math.max(BOARD_SIZE_X, BOARD_SIZE_Y) : 1;
      for (let j = 1; j <= loopCount; j += 1) {
        const moveX = pos.x + move.x * j;
        const moveY = pos.y + move.y * j;
        const movePos = stringifyBoardPosition(moveX, moveY);

        // Reached the board edge, break the loop
        if (movePos === null) {
          break;
        }

        const occupiedPiece = board[moveY][moveX];
        const isOccupied = occupiedPiece !== null;
        const isCapture = isOccupied && getPieceColor(occupiedPiece) !== this.color;
        const isEnPassant = movePos === enPassantTarget;
        const isCastle = move.type === CASTLE_KINGSIDE || move.type === CASTLE_QUEENSIDE;

        // Move is possible only if dest square is captured or free
        if (isCapture || !isOccupied) {
          possibleMoves[movePos] = {
            from: pos.position,
            to: movePos,
            piece: this.type,
            color: this.color,
            capture: isCapture,
            capturePiece: isCapture ? occupiedPiece : null,
            enPassant: isEnPassant,
            castle: isCastle ? move.type : null
          };
        }

        // Reached blocking piece, break the loop
        if (isOccupied) {
          break;
        }
      }
    });
    return possibleMoves;
  }
}

export default Piece;
