import Pawn from './pawn';
import { WHITE, PAWN, BLACK } from '../../constants';
import Piece from '../piece';

let pawn;
let emptyBoard;
beforeEach(() => {
  pawn = new Pawn(WHITE, 'A4');
  emptyBoard = [
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null),
    new Array(8).fill(null)
  ];
});

describe('Chess pawn piece class', () => {
  it('should extend Piece class', () => {
    expect(pawn instanceof Piece).toBeTruthy();
  });

  it('should be type PAWN', () => {
    expect(pawn.type).toBe(PAWN);
  });

  describe('Pawn moves', () => {
    it('should return valid pawn moves on empty board', () => {
      pawn.color = WHITE;
      pawn.position = 'B3';
      let moves = pawn.getPossibleMoves(emptyBoard);
      expect(Object.keys(moves).sort()).toEqual(['B4'].sort());

      pawn.color = BLACK;
      pawn.position = 'B6';
      moves = pawn.getPossibleMoves(emptyBoard);
      expect(Object.keys(moves).sort()).toEqual(['B5'].sort());
    });

    it('should allow 2 step pawn moves on start position', () => {
      pawn.color = WHITE;
      pawn.position = 'B2';
      let moves = pawn.getPossibleMoves(emptyBoard);
      expect(Object.keys(moves).sort()).toEqual(['B3', 'B4'].sort());

      pawn.color = BLACK;
      pawn.position = 'B7';
      moves = pawn.getPossibleMoves(emptyBoard);
      expect(Object.keys(moves).sort()).toEqual(['B6', 'B5'].sort());
    });

    it('opponent piece should block white pawn movement', () => {
      const board = [...emptyBoard];
      board[5][3] = 'p@D3';
      board[6][3] = 'P@D2';
      pawn.color = WHITE;
      pawn.position = 'D2';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual([].sort());
    });

    it('opponent piece should block white pawn double step movement', () => {
      const board = [...emptyBoard];
      board[4][3] = 'p@D4';
      board[6][3] = 'P@D2';
      pawn.color = WHITE;
      pawn.position = 'D2';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D3'].sort());
    });

    it('opponent piece should block black pawn movement', () => {
      const board = [...emptyBoard];
      board[1][3] = 'p@D7';
      board[2][3] = 'P@D6';
      pawn.color = BLACK;
      pawn.position = 'D7';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual([].sort());
    });

    it('opponent piece should block black pawn double step movement', () => {
      const board = [...emptyBoard];
      board[1][3] = 'p@D7';
      board[3][3] = 'P@D5';
      pawn.color = BLACK;
      pawn.position = 'D7';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D6'].sort());
    });

    it('should return valid white pawn capture right move', () => {
      const board = [...emptyBoard];
      board[2][4] = 'p@E6';
      board[3][3] = 'P@D5';
      pawn.color = WHITE;
      pawn.position = 'D5';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D6', 'E6'].sort());
      expect(moves.E6.capture).toBeTruthy();
    });

    it('should return valid white pawn capture left move', () => {
      const board = [...emptyBoard];
      board[2][2] = 'p@C6';
      board[3][3] = 'P@D5';
      pawn.color = WHITE;
      pawn.position = 'D5';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D6', 'C6'].sort());
      expect(moves.C6.capture).toBeTruthy();
    });

    it('should return valid black pawn capture right move', () => {
      const board = [...emptyBoard];
      board[3][3] = 'p@D5';
      board[4][2] = 'P@C4';
      pawn.color = BLACK;
      pawn.position = 'D5';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D4', 'C4'].sort());
      expect(moves.C4.capture).toBeTruthy();
    });

    it('should return valid black pawn capture left move', () => {
      const board = [...emptyBoard];
      board[3][3] = 'p@D5';
      board[4][4] = 'P@E4';
      pawn.color = BLACK;
      pawn.position = 'D5';
      const moves = pawn.getPossibleMoves(board);
      expect(Object.keys(moves).sort()).toEqual(['D4', 'E4'].sort());
      expect(moves.E4.capture).toBeTruthy();
    });

    it('should return valid white pawn en passant capture move', () => {
      const board = [...emptyBoard];
      board[3][2] = 'p@C5';
      board[3][3] = 'P@D5';
      pawn.color = WHITE;
      pawn.position = 'D5';
      const moves = pawn.getPossibleMoves(board, 'C6');
      expect(Object.keys(moves).sort()).toEqual(['D6', 'C6'].sort());
    });

    it('should return valid black pawn en passant capture move', () => {
      const board = [...emptyBoard];
      board[4][7] = 'p@H4';
      board[4][6] = 'P@G4';
      pawn.color = BLACK;
      pawn.position = 'H4';
      const moves = pawn.getPossibleMoves(board, 'G3');
      expect(Object.keys(moves).sort()).toEqual(['H3', 'G3'].sort());
    });
  });
});
