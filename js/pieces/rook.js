import Piece from "./piece.js";
export default class Rook extends Piece{
        constructor(row, col, color){
            super("rook", row, col, color);
            this.hasMoved = false;
        }
        canMove(chessboard,row, col){
            if(row !== this.row && col !== this.col){
                return false;
            }
            const rowDir = row > this.row ? 1 : (row < this.row ? -1 : 0);
            const colDir = col > this.col ? 1 : (col < this.col ? -1 : 0);


            let currentRow = this.row + rowDir;
            let currentCol = this.col + colDir;
            while(currentRow !== row || currentCol !== col){
                if(chessboard[currentRow][currentCol] !== null){
                    return false; //path is blocked
                }
                currentRow += rowDir;
                currentCol += colDir;
            }
            const targetPiece = chessboard[row][col];
            return targetPiece === null || targetPiece.color !== this.color;
        }
        
        
        getValidMoves(chessboard,myKing){
            let validMoves = []
            const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            //check the row
            for(const[r,c] of directions){
                let currentRow = this.row + r;
                let currentCol = this.col + c;
                while(currentRow >= 0 && currentRow < 8 && currentCol >= 0 && currentCol < 8){
                    if(chessboard[currentRow][currentCol] === null){
                        if (!this.wouldPutKingInCheck(chessboard,currentRow,currentCol,myKing)){
                            validMoves.push([currentRow, currentCol]);}
                    }else{
                        if(chessboard[currentRow][currentCol].color !== this.color){
                            if (!this.wouldPutKingInCheck(chessboard,currentRow,currentCol,myKing)){
                            validMoves.push([currentRow, currentCol]);}
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
