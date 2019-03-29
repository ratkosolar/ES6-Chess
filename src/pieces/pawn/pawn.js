import Piece from '../piece';
import { PAWN, WHITE } from '../../constants';
import { stringifyBoardPosition, getBoardPieceAt } from '../../utils';

const NOT_OCCUPIED = 1;
const NOT_OCCUPIED_AND_START_POS = 2;
const IS_CAPTURE = 3;

class Pawn extends Piece {
  constructor(color, position) {
    super(color, position, PAWN);
  }

  getPossibleMoves(board, enPassantTarget) {
    const isWhite = this.color === WHITE;
    const posX = this.position.x;
    const posY = this.position.y;

    let moveset = [
      { x: 0, y: isWhite ? -1 : 1, condition: NOT_OCCUPIED },
      { x: 0, y: isWhite ? -2 : 2, condition: NOT_OCCUPIED_AND_START_POS },
      { x: 1, y: isWhite ? -1 : 1, condition: IS_CAPTURE },
      { x: -1, y: isWhite ? -1 : 1, condition: IS_CAPTURE }
    ];

    // Filter moveset with move conditions
    moveset = moveset.filter(move => {
      const targetOccupied = getBoardPieceAt(board, posX + move.x, posY + move.y) !== null;
      const targetPos = stringifyBoardPosition(posX + move.x, posY + move.y);

      if (move.condition === NOT_OCCUPIED) {
        return !targetOccupied;
      }
      if (move.condition === NOT_OCCUPIED_AND_START_POS) {
        const isStartPos = isWhite ? posY === 6 : posY === 1;
        const pathBlocked = getBoardPieceAt(board, posX, posY + (isWhite ? -1 : 1)) !== null;
        return isStartPos && !pathBlocked && !targetOccupied;
      }
      if (move.condition === IS_CAPTURE) {
        return targetOccupied || targetPos === enPassantTarget;
      }
      return true;
    });

    return this.buildPossibleMoves(board, moveset, enPassantTarget);
  }
}

export default Pawn;
