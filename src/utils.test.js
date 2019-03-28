import {
  parseBoardPosition,
  stringifyBoardPosition,
  getPieceType,
  getPieceColor,
  getPiecePosition
} from './utils';
import { PAWN, ROOK, BISHOP, KNIGHT, QUEEN, KING, WHITE, BLACK } from './constants';

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

  describe('getPieceType function', () => {
    it('should return correct piece type from string', () => {
      expect(getPieceType('P@A4')).toBe(PAWN);
      expect(getPieceType('p@D1')).toBe(PAWN);
      expect(getPieceType('R@H1')).toBe(ROOK);
      expect(getPieceType('r@B2')).toBe(ROOK);
      expect(getPieceType('B@F2')).toBe(BISHOP);
      expect(getPieceType('b@D3')).toBe(BISHOP);
      expect(getPieceType('n@F8')).toBe(KNIGHT);
      expect(getPieceType('N@D6')).toBe(KNIGHT);
      expect(getPieceType('q@G4')).toBe(QUEEN);
      expect(getPieceType('Q@E3')).toBe(QUEEN);
      expect(getPieceType('k@H5')).toBe(KING);
      expect(getPieceType('K@A6')).toBe(KING);
    });
  });

  describe('getPieceColor function', () => {
    it('should return correct piece color from string', () => {
      expect(getPieceColor('P@A4')).toBe(WHITE);
      expect(getPieceColor('p@D1')).toBe(BLACK);
      expect(getPieceColor('R@H1')).toBe(WHITE);
      expect(getPieceColor('r@B2')).toBe(BLACK);
      expect(getPieceColor('B@F2')).toBe(WHITE);
      expect(getPieceColor('b@D3')).toBe(BLACK);
      expect(getPieceColor('n@F8')).toBe(BLACK);
      expect(getPieceColor('N@D6')).toBe(WHITE);
      expect(getPieceColor('q@G4')).toBe(BLACK);
      expect(getPieceColor('Q@E3')).toBe(WHITE);
      expect(getPieceColor('k@H5')).toBe(BLACK);
      expect(getPieceColor('K@A6')).toBe(WHITE);
    });
  });

  describe('getPiecePosition function', () => {
    it('should return correct piece board position from string', () => {
      expect(getPiecePosition('P@A4')).toBe('A4');
      expect(getPiecePosition('p@D1')).toBe('D1');
      expect(getPiecePosition('R@H1')).toBe('H1');
      expect(getPiecePosition('r@B2')).toBe('B2');
      expect(getPiecePosition('B@F2')).toBe('F2');
      expect(getPiecePosition('b@D3')).toBe('D3');
      expect(getPiecePosition('n@F8')).toBe('F8');
      expect(getPiecePosition('N@D6')).toBe('D6');
      expect(getPiecePosition('q@G4')).toBe('G4');
      expect(getPiecePosition('Q@E3')).toBe('E3');
      expect(getPiecePosition('k@H5')).toBe('H5');
      expect(getPiecePosition('K@A6')).toBe('A6');
    });
  });
});
