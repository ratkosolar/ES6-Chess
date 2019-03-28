import King from './king/king';
import Queen from './queen/queen';
import Bishop from './bishop/bishop';
import Knight from './knight/knight';
import Rook from './rook/rook';
import Pawn from './pawn/pawn';
import { PAWN, ROOK, BISHOP, KNIGHT, QUEEN, KING } from '../constants';

const pieceClasses = {};
pieceClasses[PAWN] = Pawn;
pieceClasses[ROOK] = Rook;
pieceClasses[BISHOP] = Bishop;
pieceClasses[KNIGHT] = Knight;
pieceClasses[QUEEN] = Queen;
pieceClasses[KING] = King;

export default pieceClasses;
