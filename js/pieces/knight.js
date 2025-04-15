import Piece from "./piece.js";
export default class Knight extends Piece{
        constructor(row, col, color){
            super("knight", row, col, color);
        }

        canMove(row, col){
            if(row === this.row || col === this.col){
                return true;
            }
            return false;

        }
        
        
        
        getValidMoves(chessboard){
            let validMoves = [];
            const moves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            for(const [r, c] of moves){
                const newRow = this.row + r;
                const newCol = this.col + c;
                if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    if(chessboard[newRow][newCol] === null || chessboard[newRow][newCol].color !== this.color){
                        validMoves.push([newRow, newCol]);
                    }
                }
            }
            return validMoves;
        }
           
        
    
}
