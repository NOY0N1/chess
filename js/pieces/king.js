import Piece from "./piece.js";
export default class King extends Piece{
    originalRow;
    originalCol;
    hasMoved;
    constructor(row, col, color){
        super("king", row, col, color);
        this.originalRow = row;
        this.originalCol = col;
        this.hasMoved = false;
    }

isSquareThreatened(chessboard, row, col) {
    // Check if the square is threatened by any opponent piece

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = chessboard[r][c];

            if (piece !== null && piece.color !== this.color) {
                if (piece.type === "king") {
                    const dr = Math.abs(piece.row - row);
                    const dc = Math.abs(piece.col - col);
                    if (dr <= 1 && dc <= 1)
                        return true;
                    // Skip checking the king itself
                    continue;
                }
                // Use isAttacking for pawns to only check diagonal captures
                if (piece.type === "pawn") {
                    if (piece.isAttacking && piece.isAttacking(chessboard, row, col)) {
                        return true;
                    }
                } else {
                    if (piece.canMove(chessboard, row, col)) {
                        return true;
                    }
                }
            }
        }
    }
    return false; // No threats found
}
doesMovePutKingInCheck(chessboard, row, col) {
    const originalRow = this.row;
    const originalCol = this.col;
    const originalPiece = chessboard[row][col];
    // Move the king to the new position
    chessboard[this.row][this.col] = null;
    this.row = row;
    this.col= col;
    chessboard[row][col] = this; 
    // Check if the new position is threatened
    const isThreatened = this.isSquareThreatened(chessboard, row, col); 
    // Restore the original positionn
    chessboard[row][col] = originalPiece;
    chessboard[originalRow][originalCol] = this; 
    this.row = originalRow;
    this.col = originalCol;
    return isThreatened; // Return true if the move puts the king in check
}
    canMove(chessboard,row, col) {
        return this.getValidMoves(chessboard, this).some(([r, c]) => r === row && c === col);
    }

    moveTo(row, col, chessboard, myKing) {
        const startCol = this.col;
        const startRow = this.row;
        console.log('King moving from [' + startRow + ',' + startCol + '] to [' + row + ',' + col + ']');

        const moveResult = super.moveTo(row, col, chessboard, myKing);

        // Handle castling - move the rook
        if (moveResult && moveResult.success) {
            console.log('King move successful, checking for castling...');
            console.log('startCol:', startCol, 'col:', col, 'startRow:', startRow, 'row:', row);

            // King-side castling (king moves 2 squares to the right)
            if (startCol === 4 && col === 6 && startRow === row) {
                console.log('Attempting king-side castling...');
                const rook = chessboard[row][7];
                console.log('Rook at [' + row + ',7]:', rook);
                if (rook && rook.type === 'rook') {
                    chessboard[row][7] = null;
                    rook.row = row;
                    rook.col = 5;
                    chessboard[row][5] = rook;
                    rook.hasMoved = true;
                    console.log('King-side castling: Moved rook from [' + row + ',7] to [' + row + ',5]');
                }
            }
            // Queen-side castling (king moves 2 squares to the left)
            else if (startCol === 4 && col === 2 && startRow === row) {
                console.log('Attempting queen-side castling...');
                const rook = chessboard[row][0];
                console.log('Rook at [' + row + ',0]:', rook);
                if (rook && rook.type === 'rook') {
                    chessboard[row][0] = null;
                    rook.row = row;
                    rook.col = 3;
                    chessboard[row][3] = rook;
                    rook.hasMoved = true;
                    console.log('Queen-side castling: Moved rook from [' + row + ',0] to [' + row + ',3]');
                }
            }
        }

        return moveResult;
    }

    getValidMoves(chessboard){
        const validMoves = [];
        const moves = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
        ];
        for(const [r, c] of moves){
            const newRow = this.row + r;
            const newCol = this.col + c;
            if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                const piece = chessboard[newRow][newCol];
                if(piece === null || piece.color!== this.color){
                    if(!this.doesMovePutKingInCheck(chessboard, newRow, newCol)){
                        validMoves.push([newRow, newCol]);
                    }
                }
               
            }
        }
       // Castling logic
    if (!this.hasMoved && !this.doesMovePutKingInCheck(chessboard, this.row, this.col)) {
      const row = this.row;
      
      // King-side castling
      const kingSideRook = chessboard[row][7];
      if (kingSideRook && kingSideRook.type === "rook" && kingSideRook.color === this.color &&
          !kingSideRook.hasMoved && chessboard[row][5] === null && chessboard[row][6] == null &&
                    !this.isSquareThreatened(chessboard, row, 5) && !this.isSquareThreatened(chessboard, row, 6)) {
        validMoves.push([row, 6]);
      }

      // Queen-side castling
      const queenSideRook = chessboard[row][0];
      if (queenSideRook && queenSideRook.type === "rook" && queenSideRook.color === this.color &&
          !queenSideRook.hasMoved && chessboard[row][1] === null && chessboard[row][2] === null &&
          chessboard[row][3] === null && !this.isSquareThreatened(chessboard, row, 1) &&
                    !this.isSquareThreatened(chessboard, row, 2) && !this.isSquareThreatened(chessboard, row, 3)) {
        validMoves.push([row, 2]);
      }
    }
        return validMoves;
    }
    isInCheck(chessboard) {
        return this.isSquareThreatened(chessboard, this.row, this.col);
    }
}