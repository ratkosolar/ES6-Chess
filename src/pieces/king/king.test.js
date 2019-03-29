import King from './king';
import { WHITE, KING, BLACK } from '../../constants';
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

  describe('King castling', () => {
    it('should allow white king to castle queenside', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', 'N@C3', null, null, 'Q@F3', null, null],
        ['P@A2', 'B@B2', 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, null, null, 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      king.position = 'E1';
      const moves = king.getPossibleMoves(board, null, { Q: true });
      expect(Object.keys(moves).sort()).toEqual(['E2', 'D1', 'C1'].sort());
      expect(moves.C1.castle).toBeTruthy();
    });

    it('should not allow white king to castle queenside because of bishop', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', 'N@C3', null, null, 'Q@F3', null, null],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@B2', null, 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      king.position = 'E1';
      const moves = king.getPossibleMoves(board, null, { Q: true });
      expect(Object.keys(moves).sort()).toEqual(['E2', 'D1'].sort());
    });

    it('should allow white king to castle kingside', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', 'N@C3', null, null, 'Q@F3', null, 'N@G1'],
        ['P@A2', null, 'P@C2', 'P@D2', 'B@F1', 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@B2', null, 'K@E1', null, null, 'R@H1']
      ];
      king.position = 'E1';
      const moves = king.getPossibleMoves(board, null, { K: true });
      expect(Object.keys(moves).sort()).toEqual(['D1', 'F1', 'G1'].sort());
      expect(moves.G1.castle).toBeTruthy();
    });

    it('should not allow white king to castle kingside because of bishop', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', 'N@C3', null, null, 'Q@F3', null, 'N@G1'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@B2', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.position = 'E1';
      const moves = king.getPossibleMoves(board, null, { K: true });
      expect(Object.keys(moves).sort()).toEqual(['E2', 'D1'].sort());
    });

    it('should allow white king to castle both sides', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, 'p@B6', null, 'p@D6', null, 'n@F6', null, null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', 'N@C3', null, null, 'Q@F3', null, 'N@G1'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, null, null, 'K@E1', null, null, 'R@H1']
      ];
      king.position = 'E1';
      const moves = king.getPossibleMoves(board, null, { K: true, Q: true });
      expect(Object.keys(moves).sort()).toEqual(['E2', 'D1', 'F1', 'C1', 'G1'].sort());
      expect(moves.C1.castle).toBeTruthy();
      expect(moves.G1.castle).toBeTruthy();
    });
    it('should allow black king to castle queenside', () => {
      const board = [
        ['r@A8', null, null, null, 'k@E8', null, null, 'r@H8'],
        ['p@A7', null, 'p@C7', 'b@B7', 'q@E7', 'p@F7', 'b@G7', 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { q: true });
      expect(Object.keys(moves).sort()).toEqual(['D8', 'F8', 'C8'].sort());
      expect(moves.C8.castle).toBeTruthy();
    });

    it('should not allow black king to castle queenside because of bishop', () => {
      const board = [
        ['r@A8', null, 'b@B7', null, 'k@E8', null, null, 'r@H8'],
        ['p@A7', null, 'p@C7', null, 'q@E7', 'p@F7', 'b@G7', 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { q: true });
      expect(Object.keys(moves).sort()).toEqual(['D7', 'D8', 'F8'].sort());
    });

    it('should allow black king to castle kingside', () => {
      const board = [
        ['r@A8', null, null, null, 'k@E8', null, null, 'r@H8'],
        ['p@A7', 'b@B7', 'p@C7', null, 'q@E7', 'p@F7', 'b@G7', 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { k: true });
      expect(Object.keys(moves).sort()).toEqual(['D7', 'D8', 'F8', 'G8'].sort());
      expect(moves.G8.castle).toBeTruthy();
    });

    it('should not allow black king to castle kingside because of bishop', () => {
      const board = [
        ['r@A8', null, null, null, 'k@E8', null, 'b@G8', 'r@H8'],
        ['p@A7', 'b@B7', 'p@C7', null, 'q@E7', 'p@F7', null, 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { k: true });
      expect(Object.keys(moves).sort()).toEqual(['D7', 'D8', 'F8'].sort());
    });

    it('should allow black king to castle both sides', () => {
      const board = [
        ['r@A8', null, null, null, 'k@E8', null, null, 'r@H8'],
        ['p@A7', 'b@B7', 'p@C7', null, 'q@E7', 'p@F7', 'b@G7', 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { q: true, k: true });
      expect(Object.keys(moves).sort()).toEqual(['D8', 'F8', 'D7', 'G8', 'C8'].sort());
      expect(moves.G8.castle).toBeTruthy();
      expect(moves.C8.castle).toBeTruthy();
    });

    it('should block black king to castle because of check', () => {
      const board = [
        ['r@A8', null, null, null, 'k@E8', null, null, 'r@H8'],
        ['p@A7', 'b@B7', 'p@C7', null, 'q@E7', 'p@F7', 'b@G7', 'p@H7'],
        [null, 'p@B6', 'n@C6', 'p@D6', null, 'n@F6', 'p@G6', null],
        [null, null, null, null, 'p@E5', null, null, null],
        [null, null, null, null, 'P@E4', null, null, null],
        [null, 'P@B3', null, null, null, 'Q@F3', null, 'N@H3'],
        ['P@A2', null, 'P@C2', 'P@D2', null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', null, 'K@E1', 'B@F1', null, 'R@H1']
      ];
      king.color = BLACK;
      king.position = 'E8';
      const moves = king.getPossibleMoves(board, null, { q: true, k: true }, true);
      expect(Object.keys(moves).sort()).toEqual(['D8', 'F8', 'D7'].sort());
    });
  });
});
