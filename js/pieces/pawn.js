import Piece from "./piece.js";
export default class Pawn extends Piece{
        constructor(row, col, color){
            super("pawn", row, col, color);
        }

        canMove(chessboard,row, col){
            if(this.color === "white"){
                if(this.row === 6 && this.col === col && row === 4){
                    return true;
                }
                if(this.row - row === 1 && this.col === col){
                    return true;
                }
                if(this.row - row === 1 && Math.abs(this.col - col) === 1){
                    return true;
                }
                return false;
            }else{
                if(this.row === 1 && this.col === col && row === 3){
                    return true;
                }
                if(row - this.row === 1 && this.col === col){
                    return true;
                }
                if(row - this.row === 1 && Math.abs(this.col - col) === 1){
                    return true;
                }
                return false;
            }
        }
       
        getValidMoves(chessboard, myKing){
            let validMoves = [];
            const direction = this.color === "white" ? -1 : 1;
            const forward = this.row + direction;
            // Forward single step
            if(forward >= 0 && forward < 8 && chessboard[forward][this.col] === null){
                if (!this.wouldPutKingInCheck(chessboard, forward, this.col, myKing)){
                    validMoves.push([forward, this.col]);
                }
                // Double step from starting position
                if((this.row === 6 && this.color === "white") || (this.row === 1 && this.color === "black")){
                    if(chessboard[this.row + 2 * direction][this.col] === null){
                        if (!this.wouldPutKingInCheck(chessboard, this.row + 2 * direction, this.col, myKing)){
                            validMoves.push([this.row + 2 * direction, this.col]);
                        }
                    }
                }
            }
            // Diagonal captures
            for(const colOffset of [1, -1]){
                const newRow = this.row + direction;
                const newCol = this.col + colOffset;
                if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    if(chessboard[newRow][newCol] !== null && chessboard[newRow][newCol].color !== this.color){
                        if (!this.wouldPutKingInCheck(chessboard, newRow, newCol, myKing)){
                            validMoves.push([newRow, newCol]);
                        }
                    }
                }
            }
            return validMoves;
        }
}