import Piece from '../piece';
import { QUEEN } from '../../constants';
import { stringifyBoardPosition, getPieceColor } from '../../utils';

class Queen extends Piece {
  constructor(color, position) {
    super(color, position, QUEEN);
  }

  getPossibleMoves(board) {
    const possibleMoves = {};
    const pos = this.position;

    // Queen move directions
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 }
    ];

    // Build possible queen moves in all directions
    for (let i = 0, l = directions.length; i < l; i += 1) {
      const dir = directions[i];
      for (let j = 1; j <= 8; j += 1) {
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

export default Queen;
