import FenParser from './index';
import { BLACK, WHITE } from '../constants';

let fenParser;
beforeEach(() => {
  fenParser = new FenParser();
});

describe('Fen parser class instance', () => {
  describe('FEN string validation', () => {
    it('isValid should return true if a string is valid FEN', () => {
      const validFens = [
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
      ];
      validFens.forEach(fen => {
        fenParser.fen = fen;
        expect(fenParser.isValid).toBeTruthy();
      });
    });

    it('isValid should return false if a string is not a valid FEN', () => {
      const invalidFens = [
        'dshfdh/gsdhdah/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/9/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQxxkq c6 0 2',
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq l2 1 2',
        'rnbqkbnr/pppppppprrrrrr/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR z KQkq - 0 1'
      ];
      invalidFens.forEach(fen => {
        fenParser.fen = fen;
        expect(fenParser.isValid).toBeFalsy();
      });
    });
  });

  describe('FEN string parsing', () => {
    it('should parse all properties from a valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(fenParser.pieces).not.toBeNull();
      expect(fenParser.activeColor).not.toBeNull();
      expect(fenParser.castling[WHITE]).not.toBeNull();
      expect(fenParser.castling[BLACK]).not.toBeNull();
      expect(fenParser.enPassantTarget).not.toBeNull();
      expect(fenParser.halfMoves).not.toBeNull();
      expect(fenParser.fullMoves).not.toBeNull();
    });

    it('should parse active player color from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.activeColor).toBe(WHITE);

      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(fenParser.activeColor).toBe(BLACK);
    });

    it('should parse castling possibility from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.castling[WHITE]).toBeDefined();
      expect(fenParser.castling[BLACK]).toBeDefined();
      expect(fenParser.castling[WHITE]).toEqual({ kingSide: true, queenSide: true });
      expect(fenParser.castling[BLACK]).toEqual({ kingSide: true, queenSide: true });

      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQ e3 0 1';
      expect(fenParser.castling[WHITE]).toBeDefined();
      expect(fenParser.castling[BLACK]).toBeDefined();
      expect(fenParser.castling[WHITE]).toEqual({ kingSide: true, queenSide: true });
      expect(fenParser.castling[BLACK]).toEqual({ kingSide: false, queenSide: false });

      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b Kq e3 0 1';
      expect(fenParser.castling[WHITE]).toBeDefined();
      expect(fenParser.castling[BLACK]).toBeDefined();
      expect(fenParser.castling[WHITE]).toEqual({ kingSide: true, queenSide: false });
      expect(fenParser.castling[BLACK]).toEqual({ kingSide: false, queenSide: true });

      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b - e3 0 1';
      expect(fenParser.castling[WHITE]).toBeDefined();
      expect(fenParser.castling[BLACK]).toBeDefined();
      expect(fenParser.castling[WHITE]).toEqual({ kingSide: false, queenSide: false });
      expect(fenParser.castling[BLACK]).toEqual({ kingSide: false, queenSide: false });
    });

    it('should parse en passant target from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.enPassantTarget).toBeNull();
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
      expect(fenParser.enPassantTarget).toBe('E3');
    });

    it('should parse half moves count from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.halfMoves).toBe(0);
      fenParser.fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      expect(fenParser.halfMoves).toBe(1);
    });

    it('should parse full moves count from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.fullMoves).toBe(1);
      fenParser.fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      expect(fenParser.fullMoves).toBe(2);
    });

    it('should parse a board matrix with chess pieces from valid FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(fenParser.pieces).toEqual([
        [
          { type: 'r', color: 'b', position: 'A8' },
          { type: 'n', color: 'b', position: 'B8' },
          { type: 'b', color: 'b', position: 'C8' },
          { type: 'q', color: 'b', position: 'D8' },
          { type: 'k', color: 'b', position: 'E8' },
          { type: 'b', color: 'b', position: 'F8' },
          { type: 'n', color: 'b', position: 'G8' },
          { type: 'r', color: 'b', position: 'H8' }
        ],
        [
          { type: 'p', color: 'b', position: 'A7' },
          { type: 'p', color: 'b', position: 'B7' },
          { type: 'p', color: 'b', position: 'C7' },
          { type: 'p', color: 'b', position: 'D7' },
          { type: 'p', color: 'b', position: 'E7' },
          { type: 'p', color: 'b', position: 'F7' },
          { type: 'p', color: 'b', position: 'G7' },
          { type: 'p', color: 'b', position: 'H7' }
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
          { type: 'p', color: 'w', position: 'A2' },
          { type: 'p', color: 'w', position: 'B2' },
          { type: 'p', color: 'w', position: 'C2' },
          { type: 'p', color: 'w', position: 'D2' },
          { type: 'p', color: 'w', position: 'E2' },
          { type: 'p', color: 'w', position: 'F2' },
          { type: 'p', color: 'w', position: 'G2' },
          { type: 'p', color: 'w', position: 'H2' }
        ],
        [
          { type: 'r', color: 'w', position: 'A1' },
          { type: 'n', color: 'w', position: 'B1' },
          { type: 'b', color: 'w', position: 'C1' },
          { type: 'q', color: 'w', position: 'D1' },
          { type: 'k', color: 'w', position: 'E1' },
          { type: 'b', color: 'w', position: 'F1' },
          { type: 'n', color: 'w', position: 'G1' },
          { type: 'r', color: 'w', position: 'H1' }
        ]
      ]);
      fenParser.fen = '1r3rk1/pb3p1p/np1Nn1p1/3pP1q1/3P4/1P1Q4/PBP5/1KR4R w - - 30 40';
      expect(fenParser.pieces).toEqual([
        [
          null,
          { type: 'r', color: 'b', position: 'B8' },
          null,
          null,
          null,
          { type: 'r', color: 'b', position: 'F8' },
          { type: 'k', color: 'b', position: 'G8' },
          null
        ],
        [
          { type: 'p', color: 'b', position: 'A7' },
          { type: 'b', color: 'b', position: 'B7' },
          null,
          null,
          null,
          { type: 'p', color: 'b', position: 'F7' },
          null,
          { type: 'p', color: 'b', position: 'H7' }
        ],
        [
          { type: 'n', color: 'b', position: 'A6' },
          { type: 'p', color: 'b', position: 'B6' },
          null,
          { type: 'n', color: 'w', position: 'D6' },
          { type: 'n', color: 'b', position: 'E6' },
          null,
          { type: 'p', color: 'b', position: 'G6' },
          null
        ],
        [
          null,
          null,
          null,
          { type: 'p', color: 'b', position: 'D5' },
          { type: 'p', color: 'w', position: 'E5' },
          null,
          { type: 'q', color: 'b', position: 'G5' },
          null
        ],
        [null, null, null, { type: 'p', color: 'w', position: 'D4' }, null, null, null, null],
        [
          null,
          { type: 'p', color: 'w', position: 'B3' },
          null,
          { type: 'q', color: 'w', position: 'D3' },
          null,
          null,
          null,
          null
        ],
        [
          { type: 'p', color: 'w', position: 'A2' },
          { type: 'b', color: 'w', position: 'B2' },
          { type: 'p', color: 'w', position: 'C2' },
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          { type: 'k', color: 'w', position: 'B1' },
          { type: 'r', color: 'w', position: 'C1' },
          null,
          null,
          null,
          null,
          { type: 'r', color: 'w', position: 'H1' }
        ]
      ]);
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
        fenParser.fen = fen;
        expect(fenParser.stringify()).toBe(fen);
      });
    });

    it('stringify should return updated FEN string', () => {
      fenParser.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      fenParser.pieces[1][2] = null;
      fenParser.pieces[1][3] = null;
      fenParser.pieces[1][4] = null;
      fenParser.pieces[2][2] = { type: 'p', color: 'b' };
      fenParser.pieces[3][3] = { type: 'p', color: 'b' };
      fenParser.pieces[4][3] = { type: 'p', color: 'w' };
      fenParser.pieces[5][4] = { type: 'p', color: 'w' };
      fenParser.pieces[6][3] = null;
      fenParser.pieces[6][4] = null;
      fenParser.activeColor = BLACK;
      fenParser.enPassantTarget = 'D6';
      fenParser.castling[WHITE].kingSide = false;
      fenParser.castling[BLACK].queenSide = false;
      fenParser.halfMoves = 5;
      fenParser.fullMoves = 11;
      expect(fenParser.stringify()).toBe(
        'rnbqkbnr/pp3ppp/2p5/3p4/3P4/4P3/PPP2PPP/RNBQKBNR b Qk d6 5 11'
      );
    });
  });
});
