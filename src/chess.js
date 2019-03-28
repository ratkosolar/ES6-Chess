import pieceClasses from './pieces';
import DEFAULT_FEN, { GAME_ONGOING } from './constants';
import FenParser from './fen-parser';
import { getPieceColor, getPieceType } from './utils';

class Chess {
  constructor(fen) {
    this.init();
    this.loadFen(fen || DEFAULT_FEN);
    this.calculatePossibleMoves();
  }

  init() {
    this.history = [];
    this.info = {};
    this.status = GAME_ONGOING;
  }

  loadFen(fen) {
    this.fenParser = new FenParser();
    this.fenParser.fen = fen;

    const { pieces, activeColor, enPassantTarget, castling, halfMoves, fullMoves } = this.fenParser;
    this.board = pieces;
    this.activeColor = activeColor;
    this.enPassantTarget = enPassantTarget;
    this.castling = castling;
    this.halfMoves = halfMoves;
    this.fullMoves = fullMoves;
  }

  loadPgn(pgn) {
    // TODO load and parse PGN file to track history
  }

  calculatePossibleMoves() {
    this.possibleMoves = [];

    this.board.map(row => {
      row.map(piece => {
        // Only calculate moves for active color player
        const color = getPieceColor(piece);
        if (color === this.activeColor) {
          this.possibleMoves.concat(this.getPossibleMovesFor(piece));
        }
      });
    });
  }

  getPossibleMovesFor(piece) {
    const type = getPieceType(piece);
    const color = getPieceColor(piece);

    const PieceClass = pieceClasses[type];
    const chessPiece = new PieceClass(color, type);

    return chessPiece.getPossibleMoves(this.board, this.enPassantTarget, this.castling);
  }
}

export default Chess;
