import Chess from './chess';
import { WHITE } from './constants';

let chess;
beforeEach(() => {
  chess = new Chess();
});

describe('Chess class instance', () => {
  it('Load and parse FEN string', () => {
    chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(chess.castling).toEqual({ K: true, Q: true, k: true, q: true });
  });

  describe('chess moves', () => {
    it('should prevent black from making a first move', () => {
      expect(() => chess.move('p@D7', 'D5')).toThrowError();
    });
    it('should allow white to make only 1 move', () => {
      expect(() => chess.move('P@D2', 'D4')).not.toThrowError();
      expect(() => chess.move('P@E2', 'E3')).toThrowError();
    });
    it('should record en passant target when 2 step pawn move', () => {
      chess.move('P@D2', 'D4');
      expect(chess.enPassantTarget).toBe('D3');
      chess.move('p@D7', 'D5');
      expect(chess.enPassantTarget).toBe('D6');
      chess.move('P@C2', 'C3');
      expect(chess.enPassantTarget).toBe(null);
    });
    it('should move rooks when castling queen side', () => {
      chess.move('P@D2', 'D4');
      chess.move('p@D7', 'D5');
      chess.move('P@B2', 'B3');
      chess.move('p@B7', 'B6');
      chess.move('B@C1', 'B2');
      chess.move('b@C8', 'B7');
      chess.move('N@B1', 'C3');
      chess.move('n@B8', 'C6');
      chess.move('Q@D1', 'D2');
      chess.move('q@D8', 'D7');

      // white queen side castle
      chess.move('K@E1', 'C1');
      let board = chess.getBoard();
      expect(board[7][0]).toBe(null);
      expect(board[7][3]).toBe('R@D1');

      // black queen side castle
      chess.move('k@E8', 'C8');
      board = chess.getBoard();
      expect(board[0][0]).toBe(null);
      expect(board[0][3]).toBe('r@D8');
    });
    it('should move rooks when castling king side', () => {
      chess.move('P@E2', 'E4');
      chess.move('p@E7', 'E5');
      chess.move('P@G2', 'G3');
      chess.move('p@G7', 'G6');
      chess.move('B@F1', 'G2');
      chess.move('b@F8', 'G7');
      chess.move('N@G1', 'F3');
      chess.move('n@G8', 'F6');

      // white king side castle
      chess.move('K@E1', 'G1');
      let board = chess.getBoard();
      expect(board[7][7]).toBe(null);
      expect(board[7][5]).toBe('R@F1');

      // black king side castle
      chess.move('k@E8', 'G8');
      board = chess.getBoard();
      expect(board[0][7]).toBe(null);
      expect(board[0][5]).toBe('r@F8');
    });
    it('should mark game as done if checkmate', () => {
      chess.move('P@E2', 'E4');
      chess.move('p@E7', 'E5');
      chess.move('B@F1', 'C4');
      chess.move('p@D7', 'D6');
      chess.move('Q@D1', 'F3');
      chess.move('n@B8', 'C6');
      chess.move('Q@F3', 'F7');
      expect(chess.isComplete()).toBe(true);
      expect(chess.isCheck()).toBe(true);
      expect(chess.isCheckmate()).toBe(true);
      expect(chess.isCheck(WHITE)).toBe(false);
      expect(chess.isDraw()).toBe(false);
    });
  });
});
