import { IMAGES, QUESTIONS_LEVEL_ONE } from "./consts";
import { displayQuestion } from "./actions";
import "./style.css";
import Phaser from "phaser";

//Game objects

var player;
var cursors;
var gameOver = false;
var door;
var level = 1;
var lifes = 2;
var questionNumber = 1;
var question;
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 625,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload() {
  IMAGES.forEach((image) => {
    this.load.image(image.name, image.path);
  });

  // //Aqui se cargan los assets
  // this.load.image("sky", "assets/bg-level1.png");
  // this.load.image("ground", "assets/platform.png");
  // // this.load.image('star', 'assets/star.png');
  // // this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  this.add.image(400, 300, "sky");

  player = this.physics.add.sprite(100, 450, "dude");
  //remove gravity
  door = this.physics.add.staticGroup(); // Agrega la puerta como objeto estático

  door.create(610, 75, "door");

  // platforms.create(400, 568, "ground").setScale(2).refreshBody();

  player.setBounce(0);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  // ir hacia arriba
  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  // this.physics.add.overlap(player, door, collisionWithNextLevel, null, this);

  this.physics.add.collider(
    player,
    door,
    function () {
      collisionWithDoor();
      this.scene.pause();
    },
    null,
    this
  );

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  // Movimiento vertical
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("down", true);
  } else {
    player.setVelocityY(0);
  }
}

const generateQuestion = () => {
  let question;

  if (level === 1) {
    question =
      QUESTIONS_LEVEL_ONE[
        Math.floor(Math.random() * QUESTIONS_LEVEL_ONE.length)
      ];
  }

  return question;
};
function validateAnswer() {
  const answer = document.getElementsByName("answer");
  const { value } = Array.from(answer).find((item) => item.checked);
  const correctAnswer = question.options.find((option) => option.correct);

  if (!value.trim() || value.trim() === "") {
    alert("Debes introducir una respuesta");
    return;
  }

  if (value.toLowerCase() === correctAnswer.text.toLowerCase()) {
    alert("Respuesta correcta");
    questionNumber++;

    question = generateQuestion();

    displayQuestion(question.question, question.options, level, questionNumber);
    const btnSubmitAnswer = document.querySelector("#btnSubmitAnswer");
    btnSubmitAnswer.addEventListener("click", validateAnswer);
  } else {
    alert("Respuesta incorrecta");
    lifes--;
    if (lifes === 0) {
      alert("Game over");
      gameOver = true;
    }
  }
}

function collisionWithDoor() {
  question = generateQuestion();
  displayQuestion(question.question, question.options, level, questionNumber);
  const btnSubmitAnswer = document.querySelector("#btnSubmitAnswer");
  btnSubmitAnswer.addEventListener("click", validateAnswer);
}

const game = new Phaser.Game(config);
