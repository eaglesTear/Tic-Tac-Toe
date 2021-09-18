// STORE PLAYER NAMES (NOT 'CONST' DUE TO POSSIBILITY OF BEING ASSIGNED AUTOMATICALLY)
let player1Name = prompt("Welcome to Tic-Tac-Toe! \n\nPlayer 1, you will use 'O'. \n\n Please enter your name.");
let player2Name = prompt("Player 2, you will use 'X'. Please enter your name.");

let player_1;
let player_2;

// IF NO NAME FOR PLAYER 1 ENTERED OR 'CANCEL' IS CLICKED, AUTO-ASSIGN 'PLAYER 1'
if (player1Name === null || player1Name === "") {
    player_1 = "Player 1";
} else {
    // ISOLATE FIRST LETTER OF NAME & ALWAYS CAPITALISE - PLAYER 1
    let getFirstLetter_P1 = player1Name.slice(0, 1);
    let capFirstLetter_P1 = getFirstLetter_P1.toUpperCase();
    let getRestOfName_P1 = player1Name.slice(1, player1Name.length);
    player_1 = capFirstLetter_P1 + getRestOfName_P1;
}

// IF NO NAME FOR PLAYER 2 ENTERED OR 'CANCEL' IS CLICKED, AUTO-ASSIGN 'PLAYER 2'
if (player2Name === null || player2Name === "") {
    player_2 = "Player 2";
} else {
    // ISOLATE FIRST LETTER OF NAME & ALWAYS CAPITALISE - PLAYER 2
    let getFirstLetter_P2 = player2Name.slice(0, 1);
    let capFirstLetter_P2 = getFirstLetter_P2.toUpperCase();
    let getRestOfName_P2 = player2Name.slice(1, player2Name.length);
    player_2 = capFirstLetter_P2 + getRestOfName_P2;
}
alert(`OK ${player_1}, you're up first!`);

// FIRST PLACEMENT STARTS AS O
let currentPlayer = "O";

// INITIALISE COUNTER TO DETERMINE WHEN ALL 9 PLAYS HAVE BEEN MADE ('DRAW' FUNCTION)
let counter = 0;

// SET BOOLEAN TO PREVENT EDGE CASE (GAME CONTINUING AFTER VICTORY)
let won = false;

// STORE STATUS GLOBALLY FOR ACCESS THROUGHOUT PROGRAM
let status = document.getElementById("game-status");

// DRAW O OR X IN THE BOX
function place(box) {
    // IF ELEMENT IN BOX OR GAME IS WON, DO NOT RUN FUNCTION (OR INSERT ELEMENT AGAIN)
    if (box.innerText != "" || won) return;
    // INSERT ELEMENT ON BOX CLICK
    box.innerText = currentPlayer;
    // INCREMENT COUNTER TO PREP FOR DRAW CONDITION
    counter++;
    // IF O ALREADY PLACED, VAR SWITCHES TO X. OTHERWISE, REMAIN AS O. ADD STYLES
    if (currentPlayer === "O") {
        status.innerText = `${player_2}: make your move!`;
        box.style.backgroundColor = "#4514B2";
        status.style.color = "#FF6765";
        currentPlayer = "X";
    } else {
        status.innerText = `${player_1}: make your move!`;
        box.style.backgroundColor = "black";
        status.style.color = "#81B214";
        box.style.color = "#FF6765";
        currentPlayer = "O";
    }
    // CALL RELEVANT FUNCTIONS EACH TIME GRID IS CLICKED
    evalGameBoard();
    checkDraw();
}

// CHECK THE BOARD FOR A MATCHING 3!
function evalGameBoard() {
    // BEGIN LOOP TO CHECK ROW & COLUMN IDs & MATCHING 3 ELEMENTS
    for (let i = 0; i <= 2; i++) {
        // READY ALL COORDINATES IN SETS OF 3 FOR 'CHECKWINNER' FUNCTION
        // HORIZONTAL
        checkWinner(document.getElementById("0_" + i).innerText, document.getElementById("1_" + i).innerText, document.getElementById("2_" + i).innerText);
        // VERTICAL
        checkWinner(document.getElementById(i + "_0").innerText, document.getElementById(i + "_1").innerText, document.getElementById(i + "_2").innerText);
    }
    // DIAGONAL - NO LOOP AS COORDINATES CHANGE FOR THIS GROUP
    checkWinner(document.getElementById("0_0").innerText, document.getElementById("1_1").innerText, document.getElementById("2_2").innerText);
    checkWinner(document.getElementById("0_2").innerText, document.getElementById("1_1").innerText, document.getElementById("2_0").innerText);
}

// PASS WIN CONDITIONS & COORDINATES TO FUNCTION, CHECK & DECLARE WINNER / GAME OVER
function checkWinner(first, second, third) {

    let winMsg = document.getElementById("winner-msg");
    // DISPLAY TROPHY IMG FOR WINNER & GAME OVER MSG. SET GAME STATE TO TRUE
    if (first != "" && first === second && first === third) {
        document.querySelector("img").style.display = "block";
        status.innerText = "Game Over & thanks for playing! \nPlease click 'Reset' to play again.";
        alert("Game Over");
        won = true;
    }
    // IF P1 GETS 3 IN A ROW...
    if (first === "O" && second === "O" && third === "O") {
        winMsg.innerText = `Congratulations, ${player_1}!`;
        alert(player_1 + " wins!");
    }
    // IF P2 GETS 3 IN A ROW...
    if (first === "X" && second === "X" && third === "X") {
        winMsg.innerText = `Congratulations, ${player_2}!`;
        alert(player_2 + " wins!");
    }
}

// IF ALL 9 PLAYS HAVE BEEN MADE & WINNER NOT DECLARED, DECLARE DRAW
function checkDraw() {
    if (counter === 9 && won === false) {
        status.innerText = "Game Over & thanks for playing! \nThe game has ended in a draw. \nPlease click 'Reset' to play again.";
        alert("Game Over - You have tied!");
    }
}

// RESET GAME VIA PAGE RELOAD WHEN 'RESET' BTN CLICKED
function resetGame() {
    location.reload();
}