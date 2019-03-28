import FenParser from './index';
import { BLACK, WHITE } from '../constants';

let parser;
beforeEach(() => {
  parser = new FenParser();
});

describe('Fen parser class instance', () => {
  describe('FEN string validation', () => {
    it('isValid should return true if string is a valid FEN', () => {
      const validFens = [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq -' // no halfmoves and fullmoves
      ];
      validFens.forEach(fen => {
        parser.fen = fen;
        expect(parser.isValid).toBeTruthy();
      });
    });

    it('isValid should return false if string is not a valid FEN', () => {
      const invalidFens = [
        'dshfdh/gsdhdah/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/9/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQxxkq c6 0 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq l2 1 2',
        'rnbqkbnr/pppppppprrrrrr/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR z KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq'
      ];
      invalidFens.forEach(fen => {
        parser.fen = fen;
        expect(parser.isValid).toBeFalsy();
      });
    });
  });

  describe('FEN string parsing', () => {
    it('should parse all properties from a valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(parser.pieces).not.toBeNull();
      expect(parser.activeColor).not.toBeNull();
      expect(parser.castling).not.toBeNull();
      expect(parser.enPassantTarget).not.toBeNull();
      expect(parser.halfMoves).not.toBeNull();
      expect(parser.fullMoves).not.toBeNull();
    });

    it('should parse active player color from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(parser.activeColor).toBe(WHITE);

      parser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(parser.activeColor).toBe(BLACK);
    });

    it('should parse castling possibility from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(parser.castling).toBe('KQkq');

      parser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b - e3 0 1';
      expect(parser.castling).toBeNull();
    });

    it('should parse en passant target from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(parser.enPassantTarget).toBeNull();
      parser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(parser.enPassantTarget).toBe('E3');
    });

    it('should parse half moves count from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(parser.halfMoves).toBe(0);
      parser.fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      expect(parser.halfMoves).toBe(1);
    });

    it('should parse full moves count from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(parser.fullMoves).toBe(1);
      parser.fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      expect(parser.fullMoves).toBe(2);
    });

    it('should parse a board matrix with chess pieces from valid FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      let rows = parser.pieces;
      expect(rows[0]).toEqual(['r@A8', 'n@B8', 'b@C8', 'q@D8', 'k@E8', 'b@F8', 'n@G8', 'r@H8']);
      expect(rows[1]).toEqual(['p@A7', 'p@B7', 'p@C7', 'p@D7', 'p@E7', 'p@F7', 'p@G7', 'p@H7']);
      expect(rows[2]).toEqual([null, null, null, null, null, null, null, null]);
      expect(rows[3]).toEqual([null, null, null, null, null, null, null, null]);
      expect(rows[4]).toEqual([null, null, null, null, null, null, null, null]);
      expect(rows[5]).toEqual([null, null, null, null, null, null, null, null]);
      expect(rows[6]).toEqual(['P@A2', 'P@B2', 'P@C2', 'P@D2', 'P@E2', 'P@F2', 'P@G2', 'P@H2']);
      expect(rows[7]).toEqual(['R@A1', 'N@B1', 'B@C1', 'Q@D1', 'K@E1', 'B@F1', 'N@G1', 'R@H1']);

      parser.fen = '1r3rk1/pb3p1p/np1Nn1p1/3pP1q1/3P4/1P1Q4/PBP5/1KR4R w - - 30 40';
      rows = parser.pieces;
      expect(rows[0]).toEqual([null, 'r@B8', null, null, null, 'r@F8', 'k@G8', null]);
      expect(rows[1]).toEqual(['p@A7', 'b@B7', null, null, null, 'p@F7', null, 'p@H7']);
      expect(rows[2]).toEqual(['n@A6', 'p@B6', null, 'N@D6', 'n@E6', null, 'p@G6', null]);
      expect(rows[3]).toEqual([null, null, null, 'p@D5', 'P@E5', null, 'q@G5', null]);
      expect(rows[4]).toEqual([null, null, null, 'P@D4', null, null, null, null]);
      expect(rows[5]).toEqual([null, 'P@B3', null, 'Q@D3', null, null, null, null]);
      expect(rows[6]).toEqual(['P@A2', 'B@B2', 'P@C2', null, null, null, null, null]);
      expect(rows[7]).toEqual([null, 'K@B1', 'R@C1', null, null, null, null, 'R@H1']);
    });
  });

  describe('Object stringify', () => {
    it('stringify should return valid FEN string', () => {
      const validFens = [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
      ];
      validFens.forEach(fen => {
        parser.fen = fen;
        expect(parser.stringify()).toBe(fen);
      });
    });

    it('stringify should return updated FEN string', () => {
      parser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      parser.pieces[1][2] = null;
      parser.pieces[1][3] = null;
      parser.pieces[1][4] = null;
      parser.pieces[2][2] = 'p@C6';
      parser.pieces[3][3] = 'p@D5';
      parser.pieces[4][3] = 'P@D4';
      parser.pieces[5][4] = 'P@E3';
      parser.pieces[6][3] = null;
      parser.pieces[6][4] = null;
      parser.activeColor = BLACK;
      parser.enPassantTarget = 'D6';
      parser.castling = 'Qk';
      parser.halfMoves = 5;
      parser.fullMoves = 11;
      expect(parser.stringify()).toBe(
        'rnbqkbnr/pp3ppp/2p5/3p4/3P4/4P3/PPP2PPP/RNBQKBNR b Qk d6 5 11'
      );
    });
  });
});
