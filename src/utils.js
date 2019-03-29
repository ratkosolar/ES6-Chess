import { BLACK, WHITE, BOARD_SIZE_X, BOARD_SIZE_Y } from './constants';

export const buildBoardMatrix = (sizeX = BOARD_SIZE_X, sizeY = BOARD_SIZE_Y, fillVal = null) => {
  const matrix = [];
  for (let i = 0; i < sizeY; i += 1) {
    matrix.push(new Array(sizeX).fill(fillVal));
  }
  return matrix;
};

/**
 * Get board piece at x,y coordinates
 * @param {Array[Array]} board matrix array
 * @param {Int} x
 * @param {Int} y
 * @return {String} Board piece string 'p@A4'
 */
export const getBoardPieceAt = (board, x, y) => {
  return board[y] ? board[y][x] || null : null;
};

/**
 * Parses board position
 * @param {String} position
 * @return {x: Int, y: Int, position: String}
 */
export const parseBoardPosition = position => {
  const posArr = position.toUpperCase().split('');

  if (posArr.length !== 2) {
    return null;
  }

  const x = posArr[0].charCodeAt(0) - 65;
  const y = BOARD_SIZE_X - parseInt(posArr[1], 10);

  if (x < 0 || x >= BOARD_SIZE_X || y < 0 || y >= BOARD_SIZE_Y) {
    return null;
  }

  return {
    x,
    y,
    position: position.toUpperCase()
  };
};

/**
 * Creates a string chess board position from {x, y}
 * @param {Int} x
 * @param {int} y
 * @return {String} example - 'A4'
 */
export const stringifyBoardPosition = (x, y) => {
  if (x < 0 || x >= BOARD_SIZE_X || y < 0 || y >= BOARD_SIZE_Y) {
    return null;
  }
  return String.fromCharCode(65 + x) + (BOARD_SIZE_Y - y);
};

/**
 * Get chess piece type from string
 * @param {String} string example - "P@A4"
 * @return {String} piece type, example 'p'
 */
export const getPieceType = string => {
  if (!string) {
    return null;
  }
  return string[0].toLowerCase();
};

/**
 * Get chess piece color from string
 * @param {String} string example - "P@A4"
 * @return {String} piece color, example 'w'
 */
export const getPieceColor = string => {
  if (!string) {
    return null;
  }
  return string.charCodeAt(0) >= 97 ? BLACK : WHITE;
};

/**
 * Get chess piece color from string
 * @param {String} string example - "P@A4"
 * @return {String} example - "A4"
 */
export const getPiecePosition = string => {
  if (!string) {
    return null;
  }
  return string.split('@')[1];
};

/**
 * Validates if chess piece string matches with board matrix
 * @param {String} piece chess piece string - 'p@A4'
 * @param {Array[Array]} board chess board matrix
 * @return {Boolean} is valid
 */
export const validatePieceOnBoard = (piece, board) => {
  const stringPos = getPiecePosition(piece);
  const pos = parseBoardPosition(stringPos);
  return board[pos.y][pos.x] === piece;
};

/**
 * Update piece string with new position
 * @param {String} piece - piece string 'P@A4'
 * @param {String} position - new position 'A5'
 * @return {String} - 'P@A5'
 */
export const updatePiecePosition = (piece, position) => {
  return `${piece.split('@')[0]}@${position}`;
};

/**
 * Build piece string from type, color and position
 * @param {String} type - piece type string 'p'
 * @param {String} color - piece color 'w'
 * @param {String} position - new position 'A5'
 * @return {String} - 'P@A5'
 */
export const buildPieceString = (type, color, position) => {
  const piece = color === WHITE ? type.toUpperCase() : type.toLowerCase();
  return `${piece}@${position}`;
};

/**
 * Clones chess board matrix (immutable)
 * @param {Array[Array]} board
 * @return {Array[Array]} cloned board
 */
export const cloneBoard = board => {
  const clone = board.map(row => {
    return [...row];
  });
  return clone;
};
