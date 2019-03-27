import { getFenPieceColor, getFenPieceType, stringifyBoardPosition } from '../utils';

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

class FENParser {
  constructor(fen = DEFAULT_FEN) {
    this.fen = fen;
  }

  /**
   * get/set FEN string
   */
  set fen(fen) {
    this.parse(fen);
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
    const isFenValid = !!fen.match(fenRegex);
    if (!isFenValid) {
      throw new Error(`Invalid fen string ${fen}`);
    }

    const fenFields = fen.split(' ');
    const [
      piecePlacement,
      activeColor,
      castling,
      enPassantTarget,
      halfMoves,
      fullMoves
    ] = fenFields;

    this.parsePiecePlacement(piecePlacement);
    this.activeColor = activeColor;
    this.enPassantTarget = enPassantTarget === '-' ? null : enPassantTarget.toUpperCase();
    this.castling = {
      whiteKingSide: castling.indexOf('K') > -1,
      whiteQeenSide: castling.indexOf('Q') > -1,
      blackKingSide: castling.indexOf('k') > -1,
      blackQeenSide: castling.indexOf('q') > -1
    };
    this.halfMoves = parseInt(halfMoves, 10);
    this.fullMoves = parseInt(fullMoves, 10);
  }

  parsePiecePlacement(piecePlacement) {
    const emptyFieldsMap = {
      1: '.',
      2: '..',
      3: '...',
      4: '....',
      5: '.....',
      6: '......',
      7: '.......',
      8: '........'
    };
    const matrix = piecePlacement.split('/').map((pieces, y) => {
      return pieces
        .replace(/[1-8]+/g, i => emptyFieldsMap[i])
        .split('')
        .map((piece, x) => {
          if (piece === '.') {
            return null;
          }
          return {
            color: getFenPieceColor(piece),
            type: getFenPieceType(piece),
            position: stringifyBoardPosition(x, y)
          };
        });
    });
    this.boardMatrix = matrix;
  }

  stringify() {
    const fen = this._fen;
    // TODO stringify to FEN string
    return fen;
  }
}

export default FENParser;
