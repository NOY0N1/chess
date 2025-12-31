import Piece from "./piece.js";
export default class Knight extends Piece{
        static KNIGHT_DIReCtions= [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
        constructor(row, col, color){
            super("knight", row, col, color);
        }

        canMove(chessboard,row, col){
              for(const [r, c] of Knight.KNIGHT_DIReCtions){
                if (this.row + r === row && this.col + c === col){
                    const targetSquare = chessboard[row][col]; 
                    return targetSquare === null || targetSquare.color !== this.color;
                }
            }
            return false;
        }
        
        
        
        getValidMoves(chessboard,myKing){
            let validMoves = [];
            
            for(const [r, c] of Knight.KNIGHT_DIReCtions){
                const newRow = this.row + r;
                const newCol = this.col + c;
                if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    if(chessboard[newRow][newCol] === null || chessboard[newRow][newCol].color !== this.color){
                        if (!this.wouldPutKingInCheck(chessboard,newRow,newCol,myKing)){
                            validMoves.push([newRow, newCol]);}
                    }
                }
            }
            return validMoves;
        }
           
        
    
}
