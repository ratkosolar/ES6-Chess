import { stringifyBoardPosition } from '../utils';
import { BLACK, WHITE } from '../constants';

const multipleChars = (char, length) => {
  let string = '';
  let l = length;
  while (l > 0) {
    string += char;
    l -= 1;
  }
  return string;
};

class FenParser {
  constructor(fen = null) {
    this.pieces = null;
    this.activeColor = null;
    this.enPassantTarget = null;
    this.castling = {};
    this.castling[WHITE] = null;
    this.castling[BLACK] = null;
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
    const fenRegex = /^\s*([prnbqkPRNBQK12345678]{1,8}(?:\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(w|b)\s+([KQkqA-Ha-h]{1,4}|-)\s+(?:(?:([a-h][36]|-)\s+(\d{1,3})\s+(\d{1,4}))|(?:0\s+0))\s*$/;
    const fenMatch = fen.match(fenRegex);
    this.isValid = !!fenMatch;

    if (this.isValid === true) {
      const [, pieces, color, castling, enPassant, halfMoves, fullMoves] = fenMatch;

      this.pieces = pieces.split('/').map((rows, y) => {
        return rows
          .replace(/[1-8]+/g, i => multipleChars('*', i))
          .split('')
          .map((piece, x) => {
            if (piece === '*') {
              return null;
            }
            return {
              color: piece.charCodeAt(0) >= 97 ? BLACK : WHITE,
              type: piece.toLowerCase(),
              position: stringifyBoardPosition(x, y)
            };
          });
      });

      this.activeColor = color;
      this.enPassantTarget = enPassant === '-' ? null : enPassant.toUpperCase();
      this.castling[WHITE] = {
        kingSide: castling.indexOf('K') > -1,
        queenSide: castling.indexOf('Q') > -1
      };
      this.castling[BLACK] = {
        kingSide: castling.indexOf('k') > -1,
        queenSide: castling.indexOf('q') > -1
      };
      this.halfMoves = parseInt(halfMoves, 10);
      this.fullMoves = parseInt(fullMoves, 10);
    }
  }

  get parsedFen() {
    const { pieces, activeColor, enPassantTarget, castling, halfMoves, fullMoves } = this;
    return {
      pieces,
      activeColor,
      enPassantTarget,
      castling,
      halfMoves,
      fullMoves
    };
  }

  stringify() {
    const { pieces, activeColor, castling, enPassantTarget, halfMoves, fullMoves } = this;
    const fenString = [];
    fenString.push(
      pieces
        .map(row => {
          return row.reduce((accumulator, piece) => {
            if (piece === null) {
              const lastCharIndex = accumulator.length - 1;
              const lastCharCode = accumulator.charCodeAt(lastCharIndex);
              if (lastCharCode < 56) {
                const newChar = String.fromCharCode(lastCharCode + 1);
                return accumulator.slice(0, -1) + newChar;
              }
              return `${accumulator}1`;
            }
            return (
              accumulator +
              (piece.color === WHITE ? piece.type.toUpperCase() : piece.type.toLowerCase())
            );
          }, '');
        })
        .join('/')
    );

    fenString.push(activeColor);

    let castlingString = '';
    if (castling[WHITE].kingSide === true) {
      castlingString += 'K';
    }
    if (castling[WHITE].queenSide === true) {
      castlingString += 'Q';
    }
    if (castling[BLACK].kingSide === true) {
      castlingString += 'k';
    }
    if (castling[BLACK].queenSide === true) {
      castlingString += 'q';
    }
    fenString.push(castlingString.length > 0 ? castlingString : '-');

    fenString.push(enPassantTarget === null ? '-' : enPassantTarget.toLowerCase());
    fenString.push(halfMoves);
    fenString.push(fullMoves);

    this._fen = fenString.join(' ');
    return this._fen;
  }
}

export default FenParser;
