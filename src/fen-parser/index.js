import { stringifyBoardPosition, getPieceColor, getPieceType } from '../utils';
import { WHITE } from '../constants';

class FenParser {
  constructor(fen = null) {
    this.pieces = null;
    this.activeColor = null;
    this.enPassantTarget = null;
    this.castling = null;
    this.halfMoves = null;
    this.fullMoves = null;
    this.fen = fen;
  }

  /**
   * Get/Set FEN string
   */
  set fen(fen) {
    if (fen !== null) {
      this.parse(fen);
    }
    this._fen = fen;
  }

  get fen() {
    return this._fen;
  }

  /**
   * Validates and parses FEN string
   */
  parse(fen) {
    const fenRegex = /^\s*(?<pieces>[prnbqkPRNBQK12345678]{1,8}(\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(?<color>[wb]{1})\s+(?<castling>[KQkq]{1,4}|-)(\s+(?<enpass>[a-h][36]|-))(\s+(?<halfMoves>\d{1,4}))?(\s+(?<fullMoves>\d{1,4}))?\s*$/;
    const fenMatch = fen.match(fenRegex);
    this.isValid = !!fenMatch;

    if (this.isValid === true) {
      const { pieces, color, castling, enpass, halfMoves, fullMoves } = fenMatch.groups;

      // Build board matrix with "type@position" strings
      this.pieces = pieces.split('/').map((rows, y) => {
        return rows
          .replace(/[1-8]+/g, i => '-'.repeat(i))
          .split('')
          .map((piece, x) => {
            if (piece === '-') {
              return null;
            }
            return `${piece}@${stringifyBoardPosition(x, y)}`;
          });
      });

      this.activeColor = color;
      this.enPassantTarget = !enpass || enpass === '-' ? null : enpass.toUpperCase();
      this.castling = !castling || castling === '-' ? null : castling;
      this.halfMoves = halfMoves === undefined ? 0 : parseInt(halfMoves, 10);
      this.fullMoves = fullMoves === undefined ? 0 : parseInt(fullMoves, 10);
    }
  }

  stringify() {
    const { pieces, activeColor, castling, enPassantTarget, halfMoves, fullMoves } = this;
    const fenString = [];

    // Decode board matrix back to FEN string format
    fenString.push(
      pieces
        .map(row => {
          return row.reduce((accumulator, piece) => {
            // FEN string groups consecutive empty fields as integer(1-8)
            if (piece === null) {
              const lastCharIndex = accumulator.length - 1;
              const lastCharCode = accumulator.charCodeAt(lastCharIndex);
              if (lastCharCode < 56) {
                const newChar = String.fromCharCode(lastCharCode + 1);
                return accumulator.slice(0, -1) + newChar;
              }
              return `${accumulator}1`;
            }

            const color = getPieceColor(piece);
            const type = getPieceType(piece);
            return accumulator + (color === WHITE ? type.toUpperCase() : type.toLowerCase());
          }, '');
        })
        .join('/')
    );

    fenString.push(activeColor);
    fenString.push(castling === null ? '-' : castling);
    fenString.push(enPassantTarget === null ? '-' : enPassantTarget.toLowerCase());
    fenString.push(halfMoves);
    fenString.push(fullMoves);

    this._fen = fenString.join(' ');
    return this._fen;
  }
}

export default FenParser;
