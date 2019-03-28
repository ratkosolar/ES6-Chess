import Rook from './rook';
import { WHITE, ROOK } from '../../constants';
import Piece from '../piece';

let rook;
beforeEach(() => {
  rook = new Rook(WHITE, 'A4');
});

describe('Chess rook piece class', () => {
  it('should extend Piece class', () => {
    expect(rook instanceof Piece).toBeTruthy();
  });

  it('should be type ROOK', () => {
    expect(rook.type).toBe(ROOK);
  });
});
