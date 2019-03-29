import { WHITE, BLACK } from '../constants';
import Board from './board';

let chessBoard;
beforeEach(() => {
  chessBoard = new Board();
});

describe('Board class instance', () => {
  describe('isCheck method', () => {
    it('should return true for isCheck for white king on given board', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', null, 'n@G8', 'r@H8'],
        ['p@A7', 'p@B7', 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, null, null, null, 'p@E6', null, null, null],
        [null, 'N@B5', null, 'p@D5', null, null, null, null],
        [null, 'b@B4', null, null, 'P@E4', null, null, null],
        [null, null, null, 'P@D3', null, null, null, null],
        ['P@A2', 'P@B2', 'P@C2', null, null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@C1', 'Q@D1', 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      expect(chessBoard.isCheck(WHITE, board)).toBeTruthy();
      expect(chessBoard.isCheck(BLACK, board)).toBeFalsy();
    });
    it('should return true for isCheck for black king on given board', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', null, 'n@G8', 'r@H8'],
        ['p@A7', 'p@B7', 'p@C7', null, null, null, 'p@G7', 'p@H7'],
        [null, null, null, null, 'p@E6', 'p@F6', null, null],
        [null, null, null, 'p@D5', null, null, null, 'Q@H5'],
        [null, 'b@B4', null, null, 'P@E4', null, null, null],
        [null, null, 'N@C3', 'P@D3', null, null, null, null],
        ['P@A2', 'P@B2', 'P@C2', null, null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@C1', null, 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      expect(chessBoard.isCheck(BLACK, board)).toBeTruthy();
      expect(chessBoard.isCheck(WHITE, board)).toBeFalsy();
    });
  });

  describe('Chess legal moves calculation', () => {
    it('should block white knight @C3 from moving because of check validation', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', null, 'n@G8', 'r@H8'],
        ['p@A7', 'p@B7', 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, null, null, null, 'p@E6', null, null, null],
        [null, null, null, 'p@D5', null, null, null, null],
        [null, 'b@B4', null, null, 'P@E4', null, null, null],
        [null, null, 'N@C3', 'P@D3', null, null, null, null],
        ['P@A2', 'P@B2', 'P@C2', null, null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@C1', 'Q@D1', 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      const moves = chessBoard.getLegalMovesForPiece('N@C3', board, null, null);
      expect(moves).toEqual([]);
    });

    it('should block black pawn @F7 from moving because of check validation', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', null, 'n@G8', 'r@H8'],
        ['p@A7', 'p@B7', 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, null, null, null, 'p@E6', null, null, null],
        [null, null, null, 'p@D5', null, null, null, 'Q@H5'],
        [null, 'b@B4', null, null, 'P@E4', null, null, null],
        [null, null, 'N@C3', 'P@D3', null, null, null, null],
        ['P@A2', 'P@B2', 'P@C2', null, null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', null, 'B@C1', null, 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];
      const moves = chessBoard.getLegalMovesForPiece('p@F7', board, null, null);
      expect(moves).toEqual([]);
    });

    it('should only allow moves ending the white check', () => {
      const board = [
        ['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', null, 'n@G8', 'r@H8'],
        ['p@A7', 'p@B7', 'p@C7', null, null, 'p@F7', 'p@G7', 'p@H7'],
        [null, null, null, null, 'p@E6', null, null, null],
        [null, null, null, 'p@D5', null, null, null, null],
        [null, 'b@B4', null, null, 'P@E4', null, null, null],
        [null, null, null, 'P@D3', null, null, null, null],
        ['P@A2', 'P@B2', 'P@C2', null, null, 'P@F2', 'P@G2', 'P@H2'],
        ['R@A1', 'N@B1', 'B@C1', 'Q@D1', 'K@E1', 'B@F1', 'N@G1', 'R@H1']
      ];

      // Moving P@C2 to C3 stops the check
      let moves = chessBoard.getLegalMovesForPiece('P@C2', board, null, null);
      expect(moves.length).toBe(1);
      expect(moves[0].to).toBe('C3');

      // Moving Q@D1 to D2 stops the check
      moves = chessBoard.getLegalMovesForPiece('Q@D1', board, null, null);
      expect(moves.length).toBe(1);
      expect(moves[0].to).toBe('D2');

      // Moving B@C1 to D2 stops the check
      moves = chessBoard.getLegalMovesForPiece('B@C1', board, null, null);
      expect(moves.length).toBe(1);
      expect(moves[0].to).toBe('D2');

      // Moving N@B1 to D2 or C3 stops the check
      moves = chessBoard.getLegalMovesForPiece('N@B1', board, null, null);
      moves.sort((a, b) => a >= b);
      expect(moves.length).toBe(2);
      expect(moves[0].to).toBe('C3');
      expect(moves[1].to).toBe('D2');

      // Moving K@E1 to E2 stops the check
      moves = chessBoard.getLegalMovesForPiece('K@E1', board, null, null);
      expect(moves.length).toBe(1);
      expect(moves[0].to).toBe('E2');

      // No moves for others
      moves = chessBoard.getLegalMovesForPiece('R@A1', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('B@F1', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('N@G1', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('R@H1', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@A2', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@B2', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@D3', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@E4', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@F2', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@G2', board, null, null);
      expect(moves.length).toBe(0);
      moves = chessBoard.getLegalMovesForPiece('P@H2', board, null, null);
      expect(moves.length).toBe(0);
    });
  });
});
