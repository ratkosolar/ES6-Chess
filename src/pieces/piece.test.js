import Piece from './piece';
import { BLACK, WHITE, PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING } from '../constants';

let piece;

const setPieceType = type => {
  return () => {
    piece.type = type;
    return piece;
  };
};

const setPieceColor = color => {
  return () => {
    piece.color = color;
    return piece;
  };
};

const setPiecePosition = pos => {
  return () => {
    piece.position = pos;
    return piece;
  };
};

beforeEach(() => {
  piece = new Piece(WHITE, 'A4', PAWN);
});

describe('Chess piece class', () => {
  it('should initialize Piece class', () => {
    piece = new Piece(BLACK, 'B6', PAWN);
    expect(piece.color).toBe(BLACK);
    expect(piece.type).toBe(PAWN);
  });

  it('should validate piece type', () => {
    expect(setPieceType(ROOK)).not.toThrowError();
    expect(piece.type).toBe(ROOK);
    expect(setPieceType(BISHOP)).not.toThrowError();
    expect(piece.type).toBe(BISHOP);
    expect(setPieceType(KNIGHT)).not.toThrowError();
    expect(piece.type).toBe(KNIGHT);
    expect(setPieceType(QUEEN)).not.toThrowError();
    expect(piece.type).toBe(QUEEN);
    expect(setPieceType(KING)).not.toThrowError();
    expect(piece.type).toBe(KING);
    expect(setPieceType(PAWN)).not.toThrowError();
    expect(piece.type).toBe(PAWN);

    expect(setPieceColor(null)).toThrowError();
    expect(setPieceColor('asgasgasg')).toThrowError();
  });

  it('should validate piece color', () => {
    expect(setPieceColor(WHITE)).not.toThrowError();
    expect(piece.color).toBe(WHITE);
    expect(setPieceColor(BLACK)).not.toThrowError();
    expect(piece.color).toBe(BLACK);

    expect(setPieceColor('asgasgasg')).toThrowError();
    expect(setPieceColor(null)).toThrowError();
  });

  it('should should validate piece position', () => {
    expect(setPiecePosition('A4')).not.toThrowError();
    expect(setPiecePosition('H8')).not.toThrowError();
    expect(setPiecePosition('F7')).not.toThrowError();
    expect(setPiecePosition('B1')).not.toThrowError();

    expect(setPiecePosition('A9')).toThrowError();
    expect(setPiecePosition('I2')).toThrowError();
    expect(setPiecePosition('Z21')).toThrowError();
    expect(setPiecePosition('A4C')).toThrowError();
    expect(setPiecePosition('')).toThrowError();
  });
});
