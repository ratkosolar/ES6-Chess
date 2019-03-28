import Pawn from './pawn';
import { WHITE, PAWN } from '../../constants';
import Piece from '../piece';

let pawn;
beforeEach(() => {
  pawn = new Pawn(WHITE, 'A4');
});

describe('Chess pawn piece class', () => {
  it('should extend Piece class', () => {
    expect(pawn instanceof Piece).toBeTruthy();
  });

  it('should be type PAWN', () => {
    expect(pawn.type).toBe(PAWN);
  });
});
