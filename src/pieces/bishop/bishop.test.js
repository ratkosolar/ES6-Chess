import Bishop from './bishop';
import { WHITE, BISHOP } from '../../constants';
import Piece from '../piece';

let bishop;
beforeEach(() => {
  bishop = new Bishop(WHITE, 'A4');
});

describe('Chess bishop piece class', () => {
  it('should extend Piece class', () => {
    expect(bishop instanceof Piece).toBe(true);
  });

  it('should be type BISHOP', () => {
    expect(bishop.type).toBe(BISHOP);
  });
});
