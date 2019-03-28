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
