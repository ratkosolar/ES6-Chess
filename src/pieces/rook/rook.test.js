import Rook from './rook';
import { WHITE, ROOK } from '../../constants';
import Piece from '../piece';

let rook;
beforeEach(() => {
  rook = new Rook(WHITE, 'A4');
});

describe('Chess rook piece class', () => {
  it('should extend Piece class', () => {
    expect(rook instanceof Piece).toBeTruthy();
  });

  it('should be type ROOK', () => {
    expect(rook.type).toBe(ROOK);
  });

  describe('Rook moves', () => {
    it('should return valid rook moves on empty board', () => {
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
      rook.position = 'E5';
      const moves = rook.getPossibleMoves(emptyBoard);

      // prettier-ignore
      expect(Object.keys(moves).sort()).toEqual([ 
        'E1', 'E2', 'E3', 'E4', 'E6', 'E7', 'E8', 'A5', 'B5', 'C5',
        'D5', 'F5', 'G5', 'H5'
      ].sort());
    });

    it('should return valid rook moves on populated board', () => {
      const board = [
        [null, null, null, null, null, 'r@F8', 'k@G8', null],
        [null, 'q@B7', 'b@C7', null, 'n@E7', 'p@F7', null, 'p@H7'],
        ['p@A6', null, 'p@C6', null, null, null, 'p@G6', null],
        ['P@A5', 'p@B5', null, null, 'R@E5', null, 'P@G5', null],
        [null, 'P@B4', null, 'Q@D4', null, 'P@F4', 'B@G4', 'P@H4'],
        [null, null, null, null, null, null, null, 'K@H3'],
        [null, null, null, null, null, 'R@F2', null, null],
        [null, null, null, null, null, null, null, null]
      ];
      rook.position = 'E5';
      const moves = rook.getPossibleMoves(board);

      expect(Object.keys(moves).sort()).toEqual(
        ['E1', 'E2', 'E3', 'E4', 'E6', 'E7', 'B5', 'C5', 'D5', 'F5'].sort()
      );
      expect(moves.E7.capture).toBeTruthy();
      expect(moves.B5.capture).toBeTruthy();
      expect(moves.E1.capture).toBeFalsy();
      expect(moves.E2.capture).toBeFalsy();
      expect(moves.E3.capture).toBeFalsy();
      expect(moves.E4.capture).toBeFalsy();
      expect(moves.E6.capture).toBeFalsy();
      expect(moves.C5.capture).toBeFalsy();
      expect(moves.D5.capture).toBeFalsy();
      expect(moves.F5.capture).toBeFalsy();
    });
  });
});
