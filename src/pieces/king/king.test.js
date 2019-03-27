import King from './king';
import { WHITE, KING } from '../../constants';
import Piece from '../piece';

let king;
beforeEach(() => {
  king = new King(WHITE, 'A4');
});

describe('Chess king piece class', () => {
  it('should extend Piece class', () => {
    expect(king instanceof Piece).toBe(true);
  });

  it('should be type KING', () => {
    expect(king.type).toBe(KING);
  });
});
