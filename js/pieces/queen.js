import Piece from "./piece.js";
export default class Queen extends Piece{
        constructor(row, col, color){
            super("queen", row, col, color);
        }

        canMove(chessboard,row, col){
            // Check if move is geometrically valid (straight line or diagonal)
            const isStraight = (row === this.row || col === this.col);
            const isDiagonal = Math.abs(row - this.row) === Math.abs(col - this.col);

            if (!isStraight && !isDiagonal) {
                return false;
            }

            // Check if path is clear (no pieces blocking)
            const rowDir = row > this.row ? 1 : row < this.row ? -1 : 0;
            const colDir = col > this.col ? 1 : col < this.col ? -1 : 0;

            let currentRow = this.row + rowDir;
            let currentCol = this.col + colDir;

            while (currentRow !== row || currentCol !== col) {
                if (chessboard[currentRow][currentCol] !== null) {
                    return false; // Path is blocked
                }
                currentRow += rowDir;
                currentCol += colDir;
            }
            
            const targetPiece = chessboard[row][col];
            return targetPiece === null || targetPiece.color !== this.color; // Path is clear

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