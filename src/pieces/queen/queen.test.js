import Queen from './queen';
import { WHITE, QUEEN } from '../../constants';
import Piece from '../piece';

let queen;
beforeEach(() => {
  queen = new Queen(WHITE, 'A4');
});

describe('Chess queen piece class', () => {
  it('should extend Piece class', () => {
    expect(queen instanceof Piece).toBeTruthy();
  });

  it('should be type QUEEN', () => {
    expect(queen.type).toBe(QUEEN);
  });

  describe('Queen moves', () => {
    it('should return valid queen moves on empty board', () => {
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
      queen.position = 'D4';
      const moves = queen.getPossibleMoves(emptyBoard);

      // prettier-ignore
      expect(Object.keys(moves).sort()).toEqual([ 
        'D1', 'D2', 'D3', 'D5', 'D6', 'D7', 'D8', 'A4', 'B4', 'C4',
        'E4', 'F4', 'G4', 'H4', 'A1', 'B2', 'C3', 'E5', 'F6', 'G7',
        'H8', 'A7', 'B6', 'C5', 'E3', 'F2', 'G1'
      ].sort());
    });

    it('should return valid queen moves on populated board', () => {
      const board = [
        ['r@A8', 'n@B8', null, 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', 'b@B7', 'p@C7', null, null, 'p@F7', 'p@G7', null],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, 'p@H6'],
        [null, null, null, 'N@D5', 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', 'Q@F4', null, null],
        [null, 'P@B3', null, 'P@D3', null, null, 'P@G3', null],
        ['P@A2', null, 'P@C2', null, null, 'P@F2', 'B@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', null, null, 'R@H1']
      ];
      queen.position = 'F4';
      const moves = queen.getPossibleMoves(board);

      expect(Object.keys(moves).sort()).toEqual(
        ['D2', 'E3', 'F3', 'F5', 'G4', 'G5', 'H4', 'E5', 'F6', 'H6'].sort()
      );
      expect(moves.E5.capture).toBeTruthy();
      expect(moves.F6.capture).toBeTruthy();
      expect(moves.H6.capture).toBeTruthy();
      expect(moves.D2.capture).toBeFalsy();
      expect(moves.E3.capture).toBeFalsy();
      expect(moves.F3.capture).toBeFalsy();
      expect(moves.F5.capture).toBeFalsy();
      expect(moves.G4.capture).toBeFalsy();
      expect(moves.G5.capture).toBeFalsy();
      expect(moves.H4.capture).toBeFalsy();
    });
  });
});
