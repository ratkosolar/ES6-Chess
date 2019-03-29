import Chess from './chess';

let chess;
beforeEach(() => {
  chess = new Chess();
});

describe('Chess class instance', () => {
  it('Load and parse FEN string', () => {
    chess.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(chess.castling).toEqual({ K: true, Q: true, k: true, q: true });
  });
});
