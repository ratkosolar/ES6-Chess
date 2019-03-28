import King from './king';
import { WHITE, KING } from '../../constants';
import Piece from '../piece';

let king;
beforeEach(() => {
  king = new King(WHITE, 'A4');
});

describe('Chess king piece class', () => {
  it('should extend Piece class', () => {
    expect(king instanceof Piece).toBeTruthy();
  });

  it('should be type KING', () => {
    expect(king.type).toBe(KING);
  });

  describe('King moves', () => {
    it('should return valid king moves on empty board', () => {
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
      king.position = 'G1';
      const moves = king.getPossibleMoves(emptyBoard);

      // prettier-ignore
      expect(Object.keys(moves).sort()).toEqual([ 
        'H1', 'H2', 'G2', 'F2', 'F1'
      ].sort());
    });

    it('should return valid king moves on populated board', () => {
      const board = [
        [null, null, null, 'b@D8', null, 'r@F8', 'k@G8', null],
        [null, 'q@B7', null, null, 'n@E7', null, null, null],
        ['p@A6', null, 'p@C6', null, null, 'p@F6', null, 'p@H6'],
        [null, 'p@B5', 'K@C5', null, null, null, 'p@G5', null],
        [null, 'P@B4', null, 'B@D4', null, null, null, null],
        [null, null, null, null, null, 'N@F3', 'P@G3', null],
        [null, null, null, null, null, 'P@F2', null, 'P@H2'],
        ['R@A1', null, null, 'Q@D1', null, 'R@F1', null, null]
      ];
      king.position = 'C5';
      const moves = king.getPossibleMoves(board);

      expect(Object.keys(moves).sort()).toEqual(['B5', 'B6', 'C6', 'D6', 'D5', 'C4'].sort());
      expect(moves.B5.capture).toBeTruthy();
      expect(moves.C6.capture).toBeTruthy();
      expect(moves.B6.capture).toBeFalsy();
      expect(moves.D6.capture).toBeFalsy();
      expect(moves.D5.capture).toBeFalsy();
      expect(moves.C4.capture).toBeFalsy();
    });
  });
});
