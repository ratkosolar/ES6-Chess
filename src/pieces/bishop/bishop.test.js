import Bishop from './bishop';
import { WHITE, BISHOP } from '../../constants';
import Piece from '../piece';

let bishop;
beforeEach(() => {
  bishop = new Bishop(WHITE, 'A4');
});

describe('Chess bishop piece class', () => {
  it('should extend Piece class', () => {
    expect(bishop instanceof Piece).toBeTruthy();
  });

  it('should be type BISHOP', () => {
    expect(bishop.type).toBe(BISHOP);
  });

  describe('Bishop moves', () => {
    it('should return valid bishop moves on empty board', () => {
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
      bishop.position = 'C2';
      const moves = bishop.getPossibleMoves(emptyBoard);

      // prettier-ignore
      expect(Object.keys(moves).sort()).toEqual([ 
        'B1', 'B3', 'A4', 'D1', 'D3', 'E4', 'F5', 'G6', 'H7'
      ].sort());
    });

    it('should return valid rook moves on populated board', () => {
      const board = [
        [null, null, null, null, null, 'r@F8', 'k@G8', null],
        [null, 'q@B7', 'b@C7', null, 'n@E7', 'p@F7', null, 'p@H7'],
        ['p@A6', null, 'p@C6', null, null, null, 'p@G6', null],
        [null, 'p@B5', null, null, 'R@E5', null, 'P@G5', null],
        [null, null, null, null, null, 'P@F4', null, 'P@H4'],
        [null, 'P@B3', null, 'B@D3', null, null, null, 'K@H3'],
        [null, null, 'P@C2', null, null, null, null, null],
        [null, null, null, 'Q@D1', null, 'R@F1', null, null]
      ];
      bishop.position = 'D3';
      const moves = bishop.getPossibleMoves(board);

      expect(Object.keys(moves).sort()).toEqual(['C4', 'B5', 'E2', 'E4', 'F5', 'G6'].sort());
      expect(moves.B5.capture).toBeTruthy();
      expect(moves.G6.capture).toBeTruthy();
      expect(moves.C4.capture).toBeFalsy();
      expect(moves.E2.capture).toBeFalsy();
      expect(moves.E4.capture).toBeFalsy();
      expect(moves.F5.capture).toBeFalsy();
    });
  });
});
