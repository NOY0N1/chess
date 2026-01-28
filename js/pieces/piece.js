export default class Piece  {
    constructor(type, row, col, color) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.color = color;
        this.captured = false;

    }

    getValidMoves(chessboard,myKing){
        throw new Error('getValidMoves method must be implemented by subclasses');
    }

    canMove(chessboard,row, col) {
        throw new Error('canMove method must be implemented by subclasses');
        }       
        
    
    //moveTo is a function that takes in a row, column, and chessboard as arguments. It checks if the move is valid and if it is, it moves the piece to the new location.
    moveTo(row, col, chessboard, myKing, lastMove = null){
        const validMoves = this.type === 'pawn' ? this.getValidMoves(chessboard, myKing, lastMove) : this.getValidMoves(chessboard, myKing);
        if (!validMoves.some((validMoves) => validMoves[0] === row && validMoves[1] === col)){
            return false;

        }
        let capturedPiece = null;
        if (chessboard[row][col] !== null && chessboard[row][col].color !== this.color){
            capturedPiece = chessboard[row][col];
            capturedPiece.captured = true;
        }

        // Handle en passant capture
        if (this.type === 'pawn' && lastMove && lastMove.piece.type === 'pawn') {
            // Check if this is an en passant capture (diagonal move to empty square)
            if (chessboard[row][col] === null && this.col !== col) {
                // Capture the pawn that's beside us
                const capturedPawnRow = this.row;
                const capturedPawnCol = col;
                capturedPiece = chessboard[capturedPawnRow][capturedPawnCol];
                if (capturedPiece) {
                    capturedPiece.captured = true;
                    chessboard[capturedPawnRow][capturedPawnCol] = null;
                }
            }
        }

        chessboard[this.row][this.col] = null;
        this.row = row;
        this.col = col;
        chessboard[this.row][this.col] = this;

        // Track if piece has moved (for castling)
        if (this.hasOwnProperty('hasMoved')) {
            this.hasMoved = true;
        }

        return { success: true, capturedPiece: capturedPiece };
    } 

    wouldPutKingInCheck(chessboard,newRow,newCol,myKing){
        const originalRow = this.row;
        const originalCol = this.col;
        const capturePiece = chessboard[newRow][newCol];

        chessboard[this.row][this.col]=null;
        chessboard[newRow][newCol]=this;
        this.row=newRow;
        this.col=newCol;

        //check king in check
        const kingInCheck=myKing.isInCheck(chessboard);

        this.row=originalRow;
        this.col=originalCol;
        chessboard[originalRow][originalCol]=this;
        chessboard[newRow][newCol]=capturePiece;
        return kingInCheck
    }
}