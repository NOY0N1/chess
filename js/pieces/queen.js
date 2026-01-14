import Piece from "./piece.js";
export default class Queen extends Piece{
        constructor(row, col, color){
            super("queen", row, col, color);
        }

        canMove(chessboard,row, col){
            if(row === this.row || col === this.col){
                return true;
            }
            if(Math.abs(row - this.row) === Math.abs(col - this.col)){
                return true;
            }
            return false;

        }
         
        getValidMoves(chessboard, myKing){
            let validMoves = []
            const directions = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
            //check the row
            for(const[r,c] of directions){
                let currentRow = this.row + r;
                let currentCol = this.col + c;
                while(currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8){
                    if(chessboard[currentRow][currentCol] === null){
                        if (!this.wouldPutKingInCheck(chessboard,currentRow,currentCol,myKing)) {
                            validMoves.push([currentRow, currentCol]);
                        }
                    }else{
                        if(chessboard[currentRow][currentCol].color !== this.color){
                            if (!this.wouldPutKingInCheck(chessboard,currentRow,currentCol,myKing)) {
                            validMoves.push([currentRow, currentCol]);
                            }
                        }
                        break;
                    }
                    currentRow += r;
                    currentCol += c;
                }
                
            }
            return validMoves;
            }
}