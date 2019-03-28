import Knight from './knight';
import { WHITE, KNIGHT } from '../../constants';
import Piece from '../piece';

let knight;
beforeEach(() => {
  knight = new Knight(WHITE, 'A4');
});

describe('Chess knight piece class', () => {
  it('should extend Piece class', () => {
    expect(knight instanceof Piece).toBeTruthy();
  });

  it('should be type KNIGHT', () => {
    expect(knight.type).toBe(KNIGHT);
  });

  describe('Knight moves', () => {
    it('should return valid knight moves on empty board', () => {
      const emptyBoard = [
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null),
        new Array(8).fill(null)
      ];
      knight.position = 'G4';
      const moves = knight.getPossibleMoves(emptyBoard);

      // prettier-ignore
      expect(Object.keys(moves).sort()).toEqual([ 
        'H6', 'H2', 'F6', 'F2', 'E5', 'E3'
      ].sort());
    });

    it('should return valid knight moves on populated board', () => {
      const board = [
        [null, null, null, null, null, 'r@F8', 'k@G8', null],
        [null, 'q@B7', null, null, 'n@E7', null, null, null],
        ['p@A6', null, 'p@C6', null, null, 'p@F6', null, 'p@H6'],
        [null, 'p@B5', null, null, null, null, 'p@G5', null],
        [null, null, null, 'b@D4', null, null, null, null],
        [null, null, null, 'B@D3', null, 'N@F3', 'P@G3', null],
        [null, null, 'P@C2', null, null, 'P@F2', null, 'P@H2'],
        ['R@A1', null, null, 'Q@D1', null, 'R@F1', 'K@G1', null]
      ];
      knight.position = 'F3';
      const moves = knight.getPossibleMoves(board);

      expect(Object.keys(moves).sort()).toEqual(['E1', 'D2', 'D4', 'E5', 'G5', 'H4'].sort());
      expect(moves.D4.capture).toBeTruthy();
      expect(moves.G5.capture).toBeTruthy();
      expect(moves.E1.capture).toBeFalsy();
      expect(moves.D2.capture).toBeFalsy();
      expect(moves.E5.capture).toBeFalsy();
      expect(moves.H4.capture).toBeFalsy();
    });
  });
});
