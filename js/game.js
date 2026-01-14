import Rook from "./pieces/rook.js";
import Knight from "./pieces/knight.js";
import Bishop from "./pieces/bishop.js";
import Queen from "./pieces/Queen.js";
import King from "./pieces/king.js";
import Pawn from "./pieces/pawn.js";
import Piece from "./pieces/piece.js";



//board
const chessboard = new Array(8).fill(null).map(() => new Array(8).fill(null));

//visual
const chessboardVisual = document.getElementById("chessboard");
var turnIndicator = document.getElementById('turn');
for (let row=0; row<8; row++){
    for(let col=0; col < 8; col++){
        //the seqrs
        const square = document.createElement("div");
        square.classList.add("square");
        if ((row + col) % 2 === 0 ) {
            square.classList.add("white");
        } else{
            square.classList.add("black");
        }
        chessboardVisual.appendChild(square);
    }

};
//color
const Color={

    BLACK:"black",
    WHITE:"white"
};
const PieceName={
    ROOK:"rook",
    KNIGHT:"knight"
};



//get the square
function getSquare(row, col){
    return chessboardVisual.children[row*8+col];
}

//pieces
const pieces = [];

//rooks
const lWhiteRook = new Rook (7, 0,Color.WHITE);
const rWhiteRook = new Rook (7, 7,Color.WHITE);
const lBlackRook = new Rook (0, 7,Color.BLACK);
const rBlackRook = new Rook (0, 0,Color.BLACK);

//knights
const lWhiteKnight = new Knight (7, 1,Color.WHITE);
const rWhiteKnight = new Knight (7, 6,Color.WHITE);
const lBlackKnight = new Knight (0, 1,Color.BLACK); 
const rBlackKnight = new Knight (0, 6,Color.BLACK);

//bishop
const lWhiteBishop = new Bishop (7, 2,Color.WHITE); 
const rWhiteBishop = new Bishop (7, 5,Color.WHITE);
const lBlackBishop = new Bishop (0, 2,Color.BLACK);
const rBlackBishop = new Bishop (0, 5,Color.BLACK);

//queen
const whiteQueen = new Queen (7, 3,Color.WHITE);
const blackQueen = new Queen (0, 3,Color.BLACK);

//king
const whiteKing = new King (7, 4,Color.WHITE);
const blackKing = new King (0, 4,Color.BLACK);

//pawns
const whitePawns = [];
const blackPawns = [];
for (let i = 0; i < 8; i++){
    whitePawns.push(new Pawn(6, i, Color.WHITE));
    pieces.push(whitePawns[i]);
    blackPawns.push(new Pawn(1, i, Color.BLACK));
    pieces.push(blackPawns[i]);
}

pieces.push(lWhiteRook, rWhiteRook, lBlackRook, rBlackRook,
     lWhiteKnight, rWhiteKnight, lBlackKnight, rBlackKnight,
      lWhiteBishop, rWhiteBishop, lBlackBishop, rBlackBishop,
      whiteQueen, blackQueen, whiteKing, blackKing);

// Assign pawns to variables by number
/*const whitePawn = [];
const blackPawn = [];
for (let i = 0; i < 8; i++) {
    whitePawn[i + 1] = whitePawns[i];
    blackPawn[i + 1] = blackPawns[i];
}
*/

//function to render the piece
function renderPiece(piece){
//kill the child
    if (piece.element && piece.element.parentNode){
        piece.element.parentNode.removeChild(piece.element);
    }
    //checking existence
    if (!piece.element) {

      chessboard[piece.row][piece.col] = piece;


        piece.element = document.createElement('img');
        const PieceName = piece.type.charAt(0).toUpperCase()+piece.type.slice(1);


        piece.element.src = "art/"+piece.color+PieceName+".svg";
        piece.element.alt = piece.color+PieceName;
        piece.element.classList.add(PieceName+'-img', piece.color+'-img');
    }

    
    const targetSquare = getSquare(piece.row, piece.col);
    const opponentColor = piece.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    const capturedPiece = targetSquare.querySelector(`.${opponentColor}-img`);
    if (capturedPiece) {
        targetSquare.removeChild(capturedPiece);
      }

    targetSquare.appendChild(piece.element);
};

//render the pieces
pieces.forEach(renderPiece);

let selectedPiece = null;
let currentPlayer = Color.WHITE;
let validMoves = [];

function attachPieceListeners() {
    pieces.forEach((piece) => {
      piece.element.addEventListener('click', () => {
        document.querySelectorAll(`.${piece.color}-valid-moves`).forEach((element) => {
          element.classList.remove(`${piece.color}-valid-moves`);
        });
        // Only allow selection if the piece matches the current player's color
        if (piece.color === currentPlayer) {
          document.querySelectorAll(".selected").forEach((el) => {
            el.classList.remove("selected");
          });
          
          selectedPiece = piece;
          console.log("Selected piece:", piece.color, piece.type);

          
          const myKing = piece.color === 'white' ? whiteKing : blackKing;

          validMoves = piece.getValidMoves(chessboard,myKing);
          for (const [row, col] of validMoves) {
            getSquare(row, col).classList.add(`${piece.color}-valid-moves`);
          }
          piece.element.parentElement.classList.add("selected");
        } else {
          console.log("WRONG TURN");
        }
      });
    });
  }

//move
/*const squares = document.querySelectorAll('.square');
squares.forEach((sq, index) => {
    sq.addEventListener('click', () => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        console.log(row, col);

        // Move the piece to the clicked square
        const moved = lWhiteRook.moveTo(row, col);
        if (moved) {
            renderPiece(lWhiteRook);
        }
    });
});*/

Array.from(chessboardVisual.children).forEach((square, index) => {
    square.addEventListener('click', () => {
      if (!selectedPiece) {
        console.log("No piece selected.");
        return;
      }
  
      const row = Math.floor(index / 8);
      const col = index % 8;
  
      // Check if the selected piece is moving to a new position
      if (selectedPiece.row !== row || selectedPiece.col !== col) {
        selectedPiece.element.parentElement.classList.remove("selected");
        const myKing = selectedPiece.color === 'white' ? whiteKing : blackKing;
        const moved = selectedPiece.moveTo(row, col, chessboard, myKing); // This function should validate and update piece position
        if (moved) {
          console.log(`Moved to row ${row}, col ${col}`);
          renderPiece(selectedPiece);
          document.querySelectorAll(`.${selectedPiece.color}-valid-moves`).forEach((element) => {
            element.classList.remove(`${selectedPiece.color}-valid-moves`);
          });

          // Clear selection immediately to avoid allowing multiple moves if an error occurs
          if (selectedPiece.element && selectedPiece.element.parentElement) {
            selectedPiece.element.parentElement.classList.remove("selected");
          }
          selectedPiece = null;

          // Update check indicator safely; don't let exceptions prevent turn switching
          try {
            const altKing = pieces.find(piece => piece.type === 'king' && piece.color !== currentPlayer);
            const previousCheckSquare = document.querySelector('.in-check');
            if (previousCheckSquare) {
              previousCheckSquare.classList.remove('in-check');
            }

            if (altKing && typeof altKing.isInCheck === 'function' && altKing.isInCheck(chessboard)) {
              const kingSquare = getSquare(altKing.row, altKing.col);
              kingSquare.classList.add('in-check');
            }
          } catch (err) {
            console.error('Error while checking king check state:', err);
          }

          // Switch turns (always attempt to switch even if check-check logic failed)
          currentPlayer = currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE;
          console.log(`Now it is ${currentPlayer}'s turn!`);
          updateTurnIndicator(); // Update the turn indicator
        } else {
          console.log("Invalid move!");
          document.querySelectorAll(`.${selectedPiece.color}-valid-moves`).forEach((element) => {
            element.classList.remove(`${selectedPiece.color}-valid-moves`);
          });
        }
      }
    });
  });

/**
 * Updates the turn indicator to reflect the current player's turn.
 * Changes the text content and the background and text colors of the turn indicator
 * based on the current turn.
 */
function updateTurnIndicator() {
    turnIndicator.textContent = currentPlayer === Color.WHITE ? 'White' : 'Black';
    turnIndicator.style.backgroundColor = currentPlayer === Color.WHITE ? 'white' : 'black';
    turnIndicator.style.color = currentPlayer === Color.WHITE ? 'black' : 'white';
}

// Initialize the turn indicator
updateTurnIndicator();

attachPieceListeners();
