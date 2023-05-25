var dotSize = 20;
var gameBoardSize = 400;
var direction = 'right';
var snake = [{ top: 0, left: 0 }];
var apple = null;
var score = 0;

function startGame() {
    direction = 'right';
    snake = [{ top: 0, left: 0 }];
    apple = null;
    score = 0;
    document.getElementById('score').innerText = 'Score: ' + score;
    if (typeof gameInterval !== 'undefined') clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
}

function gameLoop() {
    var snakeHead = Object.assign({}, snake[0]); // copy head
    switch (direction) {
        case 'left':
            snakeHead.left -= dotSize;
            break;
        case 'right':
            snakeHead.left += dotSize;
            break;
        case 'up':
            snakeHead.top -= dotSize;
            break;
        case 'down':
            snakeHead.top += dotSize;
            break;
    }

    snake.unshift(snakeHead); 

    if (apple === null) {
        apple = { top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize, left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize };
    }

    if (snakeHead.top === apple.top && snakeHead.left === apple.left) {
        apple = null;
        score += 1;
        document.getElementById('score').innerText = 'Score: ' + score;
    } else {
        snake.pop();
    }

    if (snakeHead.top < 0 || snakeHead.left < 0 || snakeHead.top === gameBoardSize || snakeHead.left === gameBoardSize || snake.slice(1).some(d => d.top === snakeHead.top && d.left === snakeHead.left)) {
        clearInterval(gameInterval);
        return alert('Game over! Your score was ' + score);
    }

    draw();
}

function draw() {
    var gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    snake.forEach(function (dot) {
        drawDot(gameBoard, dot, 'snake');
    });
    if (apple !== null) {
        drawDot(gameBoard, apple, 'apple');
    }
}

function drawDot(gameBoard, dot, id) {
    var dotElement = document.createElement('div');
    dotElement.style.top = `${dot.top}px`;
    dotElement.style.left = `${dot.left}px`;
    dotElement.className = 'dot';
    dotElement.id = id;
    gameBoard.appendChild(dotElement);
}

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
    }
});
