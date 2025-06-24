const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const gameOverText = document.getElementById("gameOverText");

let player, obstacle, gravity, jumpPower, isJumping, velocityY, gameLoop, obstacleSpeed;

startBtn.onclick = startGame;

function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";

  // Game setup
  player = { x: 50, y: 240, width: 30, height: 30 };
  obstacle = { x: 800, y: 240, width: 20, height: 30 };
  gravity = 1.5;
  jumpPower = -20;
  velocityY = 0;
  isJumping = false;
  obstacleSpeed = 6;

  // Controls
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !isJumping) {
      velocityY = jumpPower;
      isJumping = true;
    }
  });

  gameLoop = setInterval(updateGame, 1000 / 60);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update player
  velocityY += gravity;
  player.y += velocityY;
  if (player.y >= 240) {
    player.y = 240;
    isJumping = false;
  }

  // Update obstacle
  obstacle.x -= obstacleSpeed;
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width + Math.random() * 200;
  }

  // Collision
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height
  ) {
    gameOver();
  }

  // Draw player
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw obstacle
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function gameOver() {
  clearInterval(gameLoop);
  gameOverText.style.display = "block";
}
