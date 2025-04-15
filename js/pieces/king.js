import Piece from "./piece.js";
export default class King extends Piece{
        constructor(row, col, color){
            super("king", row, col, color);
        }
}