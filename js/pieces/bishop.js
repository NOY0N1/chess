import Piece from "./piece.js";
export default class Bishop extends Piece{
        constructor(row, col, color){
            super("bishop", row, col, color);
        }
        
        canMove(row, col){
            return Math.abs(row - this.row) === Math.abs(col - this.col);
        }
       
        
        getValidMoves(chessboard){
            let validMoves = [];
            const directions = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            for(const [dr, dc] of directions){
                let newRow = this.row + dr;
                let newCol = this.col + dc;
                while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    if(chessboard[newRow][newCol] === null){
                        validMoves.push([newRow, newCol]);
                    } else if(chessboard[newRow][newCol].color !== this.color){
                        validMoves.push([newRow, newCol]);
                        break;
                    } else {
                        break;
                    }
                    newRow += dr;
                    newCol += dc;
                }
            }
            return validMoves;
        }
           
        
    
}