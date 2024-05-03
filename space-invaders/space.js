let start = document.querySelector(".start");
let win = document.querySelector(".win")
let startButton = document.querySelector(".start-button");
let shootButton = document.querySelector(".shoot");
let blurPage = document.querySelector(".blur");
startButton.addEventListener("click", ()=>{
    start.remove();
    blurPage.remove();
    starting();
});

let leftArrow = document.querySelector(".left");
let rightArrow = document.querySelector(".right");

let tileSize = 24;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipVelocityX = tileSize;

let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1;

let bulletArray = [];
let bulletVelocityY = -10;

let score = 0;
let gameOver = false;

function starting() {
    board = document.querySelector("#board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    shipImg = new Image();
    shipImg.src = "stock/img/toothpaste.png";
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "stock/img/tooth.png";
    createAliens();

    requestAnimationFrame(update);
    shootButton.addEventListener("click", shoot);

    leftArrow.addEventListener("click", () => moveShip("ArrowLeft"));
    rightArrow.addEventListener("click", () => moveShip("ArrowRight"));
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        document.querySelector(".loose").style.display = "flex";
        return;
    }

    if (score >= 12000){
        end();
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX*2;

                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y >= ship.y) {
                gameOver = true;
            }
        }
    }

    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle="white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        }
    }

    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    if (alienCount == 0) {
        score += alienColumns * alienRows * 100;
        alienColumns = Math.min(alienColumns + 1, columns/2 -2);
        alienRows = Math.min(alienRows + 1, rows-4);
        if (alienVelocityX > 0) {
            alienVelocityX += 0.2;
        }
        else {
            alienVelocityX -= 0.2;
        }
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    context.fillStyle="white";
    context.font="16px courier";
    context.fillText(score, 5, 20);
}

function moveShip(direction) {
    if (gameOver) {
        document.querySelector(".loose").style.display = "flex";
        return;
    }

    if (direction === "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX;
    }
    else if (direction === "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX;
    }
}

function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img : alienImg,
                x : alienX + c*alienWidth,
                y : alienY + r*alienHeight,
                width : alienWidth,
                height : alienHeight,
                alive : true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e) {
    if (gameOver) {
        document.querySelector(".loose").style.display = "flex";
        return;
    }

        let bullet = {
            x : ship.x + shipWidth*15/32,
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false
        }
        bulletArray.push(bullet);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function end(){
    board.remove();
    win.style.display = "flex"
}

let help = document.querySelector(".help");
document.querySelector(".back").addEventListener("click", ()=>{
    document.querySelector(".skip").style.display = "none";
  })
  
  help.addEventListener("click", ()=>{
    document.querySelector(".skip").style.display = "flex";
  })