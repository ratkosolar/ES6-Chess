import { parseBoardPosition, stringifyBoardPosition } from './utils';

describe('Utility functions', () => {
  describe('parseBoardPosition function', () => {
    it('should correctly parse chess board position', () => {
      expect(parseBoardPosition('A5')).toEqual({ x: 0, y: 3, position: 'A5' });
      expect(parseBoardPosition('b1')).toEqual({ x: 1, y: 7, position: 'B1' });
      expect(parseBoardPosition('H7')).toEqual({ x: 7, y: 1, position: 'H7' });
      expect(parseBoardPosition('g8')).toEqual({ x: 6, y: 0, position: 'G8' });
    });

    it('should return null for invalid board position', () => {
      expect(parseBoardPosition('L4')).toBeNull();
      expect(parseBoardPosition('A9')).toBeNull();
      expect(parseBoardPosition('')).toBeNull();
      expect(parseBoardPosition('B44')).toBeNull();
    });
  });

  describe('stringifyBoardPosition function', () => {
    it('should correctly stringify board position', () => {
      expect(stringifyBoardPosition(0, 3)).toEqual('A5');
      expect(stringifyBoardPosition(1, 7)).toEqual('B1');
      expect(stringifyBoardPosition(7, 1)).toEqual('H7');
      expect(stringifyBoardPosition(6, 0)).toEqual('G8');
    });

    it('should return null for invalid x or y', () => {
      expect(stringifyBoardPosition(-1, 3)).toBeNull();
      expect(stringifyBoardPosition(11, 5)).toBeNull();
      expect(stringifyBoardPosition(7, 14)).toBeNull();
      expect(stringifyBoardPosition(6, -1)).toBeNull();
    });
  });
});
