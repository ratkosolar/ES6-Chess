import Queen from './queen';
import { WHITE, QUEEN } from '../../constants';
import Piece from '../piece';

let queen;
beforeEach(() => {
  queen = new Queen(WHITE, 'A4');
});

describe('Chess queen piece class', () => {
  it('should extend Piece class', () => {
    expect(queen instanceof Piece).toBe(true);
  });

  it('should be type QUEEN', () => {
    expect(queen.type).toBe(QUEEN);
  });
});
