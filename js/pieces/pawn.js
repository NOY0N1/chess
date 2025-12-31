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
       
        getValidMoves(chessboard){
            let validMoves = [];
            const direction = this.color === "white" ? -1 : 1;
            const forward = this.row + direction;
            if(forward>=0 && forward < 8 && chessboard[forward][this.col] === null){
                validMoves.push([this.row + direction, this.col]);
                if((this.row === 6 && this.color === "white") || (this.row === 1 && this.color === "black")){
                    if(chessboard[this.row + 2 * direction][this.col] === null){
                        validMoves.push([this.row + 2 * direction, this.col]);
                    }
                }
            }
            /*if(chessboard[this.row + direction][this.col + 1] !== null && chessboard[this.row + direction][this.col + 1].color !== this.color){
                validMoves.push([this.row + direction, this.col + 1]);
            }
            if(chessboard[this.row + direction][this.col - 1] !== null && chessboard[this.row + direction][this.col - 1].color !== this.color){
                validMoves.push([this.row + direction, this.col - 1]);
            }*/
           for(const [r, c] of [[direction, 1], [direction, -1]]){
                const newRow = this.row + r;
                const newCol = this.col + c;
                if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    if(chessboard[newRow][newCol] !== null && chessboard[newRow][newCol].color !== this.color){
                        validMoves.push([newRow, newCol]);
                    }
                }
            }
            return validMoves;
        }
}