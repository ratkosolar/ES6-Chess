import { BLACK, WHITE } from './constants';

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

/**
 * Creates a string chess board position from {x, y}
 * @param {Int} x
 * @param {int} y
 * @return {String} example - 'A4'
 */
export const stringifyBoardPosition = (x, y) => {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }
  return String.fromCharCode(65 + x) + (8 - y);
};

/**
 * Get chess piece type from string
 * @param {String} string example - "P@A4"
 * @return {String} piece type, example 'p'
 */
export const getPieceType = string => {
  return string[0].toLowerCase();
};

/**
 * Get chess piece color from string
 * @param {String} string example - "P@A4"
 * @return {String} piece color, example 'w'
 */
export const getPieceColor = string => {
  return string.charCodeAt(0) >= 97 ? BLACK : WHITE;
};

/**
 * Get chess piece color from string
 * @param {String} string example - "P@A4"
 * @return {String} example - "A4"
 */
export const getPiecePosition = string => {
  return string.split('@')[1];
};
