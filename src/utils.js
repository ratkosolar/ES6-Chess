import { WHITE, BLACK, CHESS_PIECE_TYPES } from './constants';

/**
 * Parses board position
 * @param {String} position
 * @example parseBoardPosition('a4') returns {x: 0, y: 4, position: 'a4'}
 */
export const parseBoardPosition = position => {
  const posArr = position.toUpperCase().split('');

  if (posArr.length !== 2) {
    return null;
  }

  const x = posArr[0].charCodeAt(0) - 65;
  const y = 8 - parseInt(posArr[1], 10);

  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }

  return {
    x,
    y,
    position: position.toUpperCase()
  };
};

export const stringifyBoardPosition = (x, y) => {
  return String.fromCharCode(65 + x) + (8 - y);
};

/**
 * Builds chess board matrix (two dimensional array)
 * @param {Integer} size
 */
export const buildBoardMatrix = (size = 8) => {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    matrix.push(new Array(size).fill(null));
  }
  return matrix;
};

export const getFenPieceColor = fenPiece => {
  if (fenPiece.charCodeAt(0) >= 97) {
    return BLACK;
  }
  return WHITE;
};

export const getFenPieceType = fenPiece => {
  const piece = fenPiece.toLowerCase();
  const typeIndex = CHESS_PIECE_TYPES.indexOf(piece);
  return typeIndex !== -1 ? CHESS_PIECE_TYPES[typeIndex] : null;
};
