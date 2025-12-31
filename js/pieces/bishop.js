import Piece from "./piece.js";
export default class Bishop extends Piece{
    static BISHOP_DIRECTIONS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

        constructor(row, col, color){
            super("bishop", row, col, color);
        }
        isPathClear(chessboard, newRow, newCol) {
        const rowStep = newRow > this.row ? 1 : -1;
        const colStep = newCol > this.col ? 1 : -1;

        let currentRow = this.row + rowStep;
        let currentCol = this.col + colStep;

        while (currentRow !== newRow && currentCol !== newCol) {
            if (chessboard[currentRow][currentCol] !== null) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }
        return true;
     }
        canMove(chessboard, row, col){
           const rowDiff = row - this.row;
    const colDiff = col - this.col;

    // Must move diagonally (equal distance in both directions)
    if (Math.abs(rowDiff) !== Math.abs(colDiff) || rowDiff === 0) {
        console.log("Not a diagonal move");
        return false;
    }

    // Normalize to unit direction and check if it matches BISHOP_DIRECTIONS
    const rowDir = rowDiff > 0 ? 1 : -1;
    const colDir = colDiff > 0 ? 1 : -1;

    const isValidDirection = Bishop.BISHOP_DIRECTIONS.some(
        ([r, c]) => r === rowDir && c === colDir
    );

    if (!isValidDirection) {
        console.log("Not a valid bishop direction");
        return false;
    }

    // Check if path is clear using helper method
    if (!this.isPathClear(chessboard, newRow, newCol)) {
        console.log("Path blocked!");
        return false;
    }

    const targetPiece = chessboard[newRow][newCol];
    const result = targetPiece === null || targetPiece.color !== this.color;
    console.log(`Can move: ${result}`);
    return result;


        }
       
        
        getValidMoves(chessboard,myKing){
            let validMoves = [];
            const directions = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            for(const [dr, dc] of directions){
                let newRow = this.row + dr;
                let newCol = this.col + dc;
                while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                    const squarePiece = chessboard[newRow][newCol];
                    if(squarePiece === null){
                         if (!this.wouldPutKingInCheck(chessboard,newRow,newCol,myKing)){
                            validMoves.push([newRow, newCol]);}
                    } else {
                        if(squarePiece.color !== this.color){
                        if (!this.wouldPutKingInCheck(chessboard,newRow,newCol,myKing)){
                            validMoves.push([newRow, newCol]);}
                        }
                        break;
                       
                    } 
                    newRow += dr;
                    newCol += dc;
                }
            }
            return validMoves;
        }
           
        
    
}