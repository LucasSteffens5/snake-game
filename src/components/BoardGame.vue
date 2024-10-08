<template>
  <div id="snakeGame-play">
    <canvas id="snakeGame"></canvas>
    <button v-if="gameOver" @click="restartGame">Reiniciar</button>
  </div>
</template>

<script>
import keyControlMixin from '../mixins/keyControlMixin.js';
import {Colors} from '../enums/Colors.js';

const GRID_SIZE = 40;
const INITIAL_SNAKE_SIZE = 3;
const GAME_OVER_TEXT = "GAME OVER";
const SCORE_TEXT = "PONTUAÇÃO : ";

export default {
  mixins: [keyControlMixin],
  data() {
    return {
      snakeGame: null,
      status: false,
      gameOver: false,
      lastFrameTime: 0,
      board: {
        context: null,
        height: window.innerHeight,
        width: window.innerWidth,
        gridSize: GRID_SIZE,
        fillStyle: Colors.BOARD_FILL,
      },
      snake: {
        positionX: 0,
        positionY: 0,
        size: INITIAL_SNAKE_SIZE,
        queue: [],
        fillStyle: Colors.SNAKE_FILL,
      },
      food: {
        positionX: 0,
        positionY: 0,
        fillStyle: Colors.FOOD_FILL,
      },
    };
  },
  methods: {
    initialize() {
      this.setupBoard();
      this.setupSnake();
      this.placeNewFood();
      this.lastFrameTime = performance.now();
      this.gameLoop();
    },
    setupBoard() {
      this.snakeGame.width = this.board.width;
      this.snakeGame.height = this.board.height;
      this.board.context = this.snakeGame.getContext("2d");
    },
    setupSnake() {
      this.snake.positionX = Math.round(this.board.width / this.board.gridSize / 2) - 1;
      this.snake.positionY = Math.round(this.board.height / this.board.gridSize / 2);
    },
    gameLoop(currentTime) {
      const deltaTime = currentTime - this.lastFrameTime;
      if (deltaTime > 100) {
        this.timerLoopStatus = true;
        this.updateGame();
        this.renderGame();
        this.lastFrameTime = currentTime;
      }
      if (!this.gameOver) {
        requestAnimationFrame(this.gameLoop);
      }
    },
    updateGame() {
      this.updateSnakePosition();
      this.checkCollisions();
      this.updateSnakeQueue();
      this.checkFoodCollision();
    },
    updateSnakePosition() {
      this.snake.positionX += this.velocity.positionX;
      this.snake.positionY += this.velocity.positionY;
      if (this.checkBoundaryCollision()) {
        this.gameOver = true;
      }
    },
    checkBoundaryCollision() {
      return this.snake.positionX < 0 || this.snake.positionX >= Math.round(this.board.width / this.board.gridSize) ||
          this.snake.positionY < 0 || this.snake.positionY >= Math.round(this.board.height / this.board.gridSize);
    },
    checkCollisions() {
      this.snake.queue.forEach((element) => {
        if (this.snake.positionX === element.positionX && this.snake.positionY === element.positionY) {
          if (this.status) {
            this.gameOver = true;
          }
        }
      });
    },
    updateSnakeQueue() {
      this.snake.queue.push({
        positionX: this.snake.positionX,
        positionY: this.snake.positionY,
      });

      while (this.snake.queue.length > this.snake.size) {
        this.snake.queue.shift();
      }
    },
    checkFoodCollision() {
      if (this.food.positionX === this.snake.positionX && this.food.positionY === this.snake.positionY) {
        this.snake.size++;
        this.placeNewFood();
      }
    },
    placeNewFood() {
      let foodLocationControl = true;

      while (foodLocationControl) {
        this.food.positionX = Math.abs(Math.round((Math.random() * this.board.width) / this.board.gridSize) - 1);
        this.food.positionY = Math.abs(Math.round((Math.random() * this.board.height) / this.board.gridSize) - 1);

        foodLocationControl = false;
        this.snake.queue.forEach((element) => {
          if (element.positionX === this.food.positionX && element.positionY === this.food.positionY) {
            foodLocationControl = true;
          }
        });
      }
    },
    renderGame() {
      this.clearBoard();
      if (this.gameOver) {
        this.renderGameOver();
      } else {
        this.renderSnake();
        this.renderFood();
        this.renderScore();
      }
    },
    clearBoard() {
      this.board.context.fillStyle = this.board.fillStyle;
      this.board.context.fillRect(0, 0, this.board.width, this.board.height);
    },
    renderGameOver() {
      this.board.context.fillStyle = Colors.GAME_OVER_TEXT;
      this.board.context.font = `${this.board.width / 10}px Arial`;
      this.board.context.fillText(GAME_OVER_TEXT, this.board.width / 5, this.board.height / 2.7);
    },
    renderSnake() {
      let lineWidth = 1;
      this.snake.queue.forEach((element, index) => {
        if (index === this.snake.queue.length - 1) {
          this.board.context.strokeStyle = Colors.SNAKE_STROKE;
          this.board.context.lineWidth = lineWidth + 5;
        } else {
          this.board.context.fillStyle = this.snake.fillStyle;
          this.board.context.strokeStyle = Colors.SNAKE_STROKE;
          this.board.context.lineWidth = lineWidth;
          lineWidth += 0.3;
        }
        this.board.context.strokeRect(
            element.positionX * this.board.gridSize,
            element.positionY * this.board.gridSize,
            this.board.gridSize - 2,
            this.board.gridSize - 2
        );
        this.board.context.fillRect(
            element.positionX * this.board.gridSize,
            element.positionY * this.board.gridSize,
            this.board.gridSize - 2,
            this.board.gridSize - 2
        );
      });
    },
    renderFood() {
      this.board.context.fillStyle = this.food.fillStyle;
      this.board.context.fillRect(
          this.food.positionX * this.board.gridSize,
          this.food.positionY * this.board.gridSize,
          this.board.gridSize,
          this.board.gridSize
      );
    },
    renderScore() {
      this.board.context.fillStyle = Colors.SCORE_TEXT;
      this.board.context.font = `${this.board.width / 100}px Arial`;
      this.board.context.fillText(
          `${SCORE_TEXT}${parseInt(this.snake.size - INITIAL_SNAKE_SIZE)}`,
          1,
          this.board.height / 20
      );
    },
    restartGame() {
      this.gameOver = false;
      this.snake.size = INITIAL_SNAKE_SIZE;
      this.snake.queue = [];
      this.initialize();
    },
  },
  mounted() {
    this.snakeGame = document.getElementById("snakeGame");
    this.initialize();
  },
  beforeDestroy() {
    this.gameOver = true;
  }
};
</script>

<style scoped>
#snakeGame-play {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation-duration: 1.5s;
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>