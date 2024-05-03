const SPEED_SCALE = 0.00001;

let blurPage = document.querySelector(".blur");
let startButton = document.querySelector(".start-button");
let start = document.querySelector(".start");
let jumpButton = document.querySelector(".jump");
let win = document.querySelector(".win");

const game = document.querySelector("#game");
const scoreDisplay = document.querySelector("#score");
const gameoverMessage = document.querySelector("#gameover-message");

let help = document.querySelector(".help");
document.querySelector(".back").addEventListener("click", ()=>{
    document.querySelector(".skip").style.display = "none";
  })
  
help.addEventListener("click", ()=>{
  document.querySelector(".skip").style.display = "flex";
})

jumpButton.addEventListener("click", () => {
  onJump();
});

startButton.addEventListener("click", () => {
  start.remove();
  blurPage.remove();
  startGame();
});

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  if (score >= 20) {
    end();
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkGameOver()) return handleGameOver();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function end(){
  win.style.display = "flex"
}

function startGame() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  gameoverMessage.classList.add("hide");
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreDisplay.textContent = Math.floor(score);
}

function checkCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function checkGameOver() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) =>
    checkCollision(rect, dinoRect)
  );
}

function handleGameOver() {
  setDinoLose();
  gameoverMessage.classList.remove("hide");
}

function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}

const GROUND_SPEED = 0.1;
const grounds = document.querySelectorAll(".ground");

function setupGround() {
  setCustomProperty(grounds[0], "--left", 0);
  setCustomProperty(grounds[1], "--left", 300);
}

function updateGround(delta, speedScale) {
  grounds.forEach((ground) => {
    incrementCustomProperty(
      ground,
      "--left",
      delta * speedScale * GROUND_SPEED * -1
    );

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}

const dino = document.querySelector("#dino");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.002;
const FRAME_TIME = 100;

let isJumping;
let currentFrameTime;
let yVelocity;

function setupDino() {
  isJumping = false;
  currentFrameTime = 0;
  yVelocity = 0;

  setCustomProperty(dino, "--bottom", 0);
}

function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function getDinoRect() {
  return dino.getBoundingClientRect();
}

function setDinoLose() {
  dino.src = "stock/img/dino-lose.png";
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dino.src = `stock/img/dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dino.src = `stock/img/dino-stationary.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  let previousBottom = getCustomProperty(dino, "--bottom");
  incrementCustomProperty(dino, "--bottom", yVelocity * delta);

  if (previousBottom >= 0 && getCustomProperty(dino, "--bottom") < 0) {
    setCustomProperty(dino, "--bottom", 0);
    isJumping = false;
    yVelocity = 0;
  } else {
    yVelocity -= GRAVITY * delta;
  }
}

function onJump() {
  if (isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}

const CACTUS_SPEED = 0.1;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

let nextCactusTime;

function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll(".cactus").forEach((cactus) => {
    cactus.remove();
  });
}

function updateCactus(delta, speedScale) {
  document.querySelectorAll(".cactus").forEach((cactus) => {
    incrementCustomProperty(
      cactus,
      "--left",
      delta * speedScale * CACTUS_SPEED * -1
    );
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomizer(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
  }
  nextCactusTime -= delta;
}

function getCactusRects() {
  return [...document.querySelectorAll(".cactus")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.src = "stock/img/cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  game.append(cactus);
}

function randomizer(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}
