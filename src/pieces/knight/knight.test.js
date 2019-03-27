import Knight from './knight';
import { WHITE, KNIGHT } from '../../constants';
import Piece from '../piece';

let knight;
beforeEach(() => {
  knight = new Knight(WHITE, 'A4');
});

describe('Chess knight piece class', () => {
  it('should extend Piece class', () => {
    expect(knight instanceof Piece).toBe(true);
  });

  it('should be type KNIGHT', () => {
    expect(knight.type).toBe(KNIGHT);
  });
});
