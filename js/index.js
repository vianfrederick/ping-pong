const canvas = document.getElementById("canvas");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const context = canvas.getContext('2d');


context.strokeStyle = 'white';
let animation;
let gameOver = false;
let check = Math.floor(Math.random() * 4) + 1;
if (check == 1) {
    var randomDirX = 5;
    var randomDirY = 5;
} else if (check == 2) {
    var randomDirX = -5;
    var randomDirY = -5;
} else if (check == 3) {
    var randomDirX = 5;
    var randomDirY = -5;
} else {
    var randomDirX = -5;
    var randomDirY = 5;
}


const player1 = {
    stick: {
        x: 40,
        y: 250
    },
    score: 0,
    life: 3
};

const player2 = {
    stick: {
        x: 920,
        y: 250
    },
    score: 0,
    life: 3
};

const gamePiece = {
    x: canvas.width / 2,
    y: canvas.height / 2
}


function drawBorders() {
    context.lineWidth = 10;
    context.setLineDash([]);

    context.strokeRect(2, 2, 995, 595);
}

function drawPlayerPieces(stick1, stick2) {
    context.fillStyle = 'red';
    context.fillRect(stick1.x, stick1.y, 40, 100);
    context.fillStyle = 'yellow';
    context.fillRect(stick2.x, stick2.y, 40, 100);
}

function drawGamePiece(gamePiece) {
    context.beginPath();
    context.lineWidth = 20;
    context.setLineDash([]);
    context.arc(gamePiece.x, gamePiece.y, 5, Math.PI / 180 * 0, Math.PI / 180 * 2, true);
    context.stroke();
}

function drawPlayer1Bar() {
    context.beginPath();
    context.moveTo(80, 0);
    context.lineWidth = 1;
    context.setLineDash([]);
    context.lineTo(80, 600);
    context.moveTo(0, 0);
    context.stroke();
}

function drawPlayer2Bar() {
    context.beginPath();
    context.moveTo(920, 0);
    context.lineWidth = 1;
    context.setLineDash([]);
    context.lineTo(920, 600);
    context.moveTo(0, 0);
    context.stroke();
}

function drawCenterLine() {
    context.beginPath();
    context.setLineDash([30, 10]);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, 600);
    context.stroke();
    context.moveTo(0, 0);
}







function update(time = 0) {
    if (!gameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBorders();
        drawPlayerPieces(player1.stick, player2.stick);
        drawGamePiece(gamePiece);
        drawPlayer1Bar();
        drawPlayer2Bar();
        drawCenterLine();
        startGame(gamePiece, player1, player2);
        updateScore();
        animation = requestAnimationFrame(update);
    }
}

function updateScore() {
    p1.innerHTML = "SCORE: " + player1.score;
    p2.innerHTML = "SCORE: " + player2.score;
}



function startGame(piece, p1, p2) {
    piece.x -= randomDirX;
    piece.y -= randomDirY;
    if (piece.y < 25) {
        randomDirY = -randomDirY;
    } else if (piece.x < 95) {
        if ((piece.y > p1.stick.y && piece.y < (p1.stick.y + 100)) || ((Math.abs((p1.stick.y + 100) - (piece.y + 20))) <= 40 && (Math.abs((p1.stick.y + 100) - (piece.y + 20))) > 0) || ((Math.abs(p1.stick.y - (piece.y - 20))) <= 40 && (Math.abs(p1.stick.y - (piece.y - 20))) > 0)) {
            randomDirX = -randomDirX;

        } else {
            p2.score++;
            gameOver = true;
            gameOver2();
        }
    } else if (piece.y > 575) {
        randomDirY = -randomDirY;
    } else if (piece.x > 905) {
        if ((piece.y > p2.stick.y && piece.y < (p2.stick.y + 100)) || ((Math.abs((p2.stick.y + 100) - (piece.y + 20))) <= 40 && (Math.abs((p2.stick.y + 100) - (piece.y + 20))) > 0) || ((Math.abs(p2.stick.y - (piece.y - 20))) <= 40 && (Math.abs(p2.stick.y - (piece.y - 20))) > 0)) {
            randomDirX = -randomDirX;

        } else {
            p1.score++;
            gameOver = true;
            gameOver2();
        }
    } else {

    }
}

function gameOver2() {
    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector(".start-btn").style.display = "block";
    }, 1000);
}



function playerupdatePos(dir, player) {
    player.stick.y += dir;
    if (player.stick.y < 10 || player.stick.y > 490) {
        player.stick.y -= dir;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 75) {
        playerupdatePos(-20, player2);
    } else if (event.keyCode === 77) {
        playerupdatePos(20, player2);
    } else if (event.keyCode === 81) {
        playerupdatePos(-20, player1);
    } else if (event.keyCode === 65) {
        playerupdatePos(20, player1);
    } else {

    }
});

function start() {
    gameOver = false;
    gamePiece.x = canvas.width / 2;
    gamePiece.y = canvas.height / 2;
    player1.stick.y = 250;
    player2.stick.y = 250;
    document.querySelector(".start-btn").style.display = "none";
    setTimeout(() => {
        animation = requestAnimationFrame(update);
    }, 1000);
}