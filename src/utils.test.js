import { parseBoardPosition, buildBoardMatrix } from './utils';

describe('Utility functions', () => {
  it('should parse chess board position to {x, y, position}', () => {
    expect(parseBoardPosition('A5')).toEqual({ x: 0, y: 3, position: 'A5' });
    expect(parseBoardPosition('b1')).toEqual({ x: 1, y: 7, position: 'B1' });
    expect(parseBoardPosition('H7')).toEqual({ x: 7, y: 1, position: 'H7' });
    expect(parseBoardPosition('g8')).toEqual({ x: 6, y: 0, position: 'G8' });
  });

  it('should return null for invalid board position', () => {
    expect(parseBoardPosition('L4')).toBe(null);
    expect(parseBoardPosition('A9')).toBe(null);
    expect(parseBoardPosition('')).toBe(null);
    expect(parseBoardPosition('B44')).toBe(null);
  });

  it('should build a empty matrix', () => {
    expect(buildBoardMatrix(3)).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    expect(buildBoardMatrix()).toEqual([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ]);
  });
});
