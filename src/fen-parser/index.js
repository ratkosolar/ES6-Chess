import { stringifyBoardPosition, getPieceColor, getPieceType } from '../utils';
import { WHITE } from '../constants';

class FenParser {
  constructor(fen = null) {
    this.board = null;
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
      this._parse(fen);
    }
    this._fen = fen;
  }

  get fen() {
    return this._fen;
  }

  /**
   * Stringify back to FEN string
   */
  stringify() {
    const { board, activeColor, castling, enPassantTarget, halfMoves, fullMoves } = this;
    const fenString = [];

    // Decode board matrix back to FEN string format
    fenString.push(
      board
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
    const castlingString = Object.keys(castling)
      .filter(key => castling[key] === true)
      .sort()
      .join('');
    fenString.push(castlingString);
    fenString.push(enPassantTarget === null ? '-' : enPassantTarget.toLowerCase());
    fenString.push(halfMoves);
    fenString.push(fullMoves);

    this._fen = fenString.join(' ');
    return this._fen;
  }

  /**
   * Validates and parses FEN string
   */
  _parse(fen) {
    const fenRegex = /^\s*(?<board>[prnbqkPRNBQK12345678]{1,8}(\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(?<color>[wb]{1})\s+(?<castling>[KQkq]{1,4}|-)(\s+(?<enpass>[a-h][36]|-))(\s+(?<halfMoves>\d{1,4}))?(\s+(?<fullMoves>\d{1,4}))?\s*$/;
    const fenMatch = fen.match(fenRegex);
    this.isValid = !!fenMatch;

    if (this.isValid === true) {
      const { board, color, castling, enpass, halfMoves, fullMoves } = fenMatch.groups;

      // Build board matrix with "type@position" strings
      this.board = board.split('/').map((rows, y) => {
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
      this.enPassantTarget = enpass === '-' ? null : enpass.toUpperCase();
      this.castling = {
        K: castling.indexOf('K') > -1,
        Q: castling.indexOf('Q') > -1,
        k: castling.indexOf('k') > -1,
        q: castling.indexOf('q') > -1
      };
      this.halfMoves = halfMoves === undefined ? 0 : parseInt(halfMoves, 10);
      this.fullMoves = fullMoves === undefined ? 1 : parseInt(fullMoves, 10);
    }
  }
}

export default FenParser;
