import { IMAGES } from "./consts";
// import { displayQuestion, generateQuestion } from "./actions";
import "./style.css";
import Phaser from "phaser";

//Game objects

var player;
var cursors;
var gameOver = false;
var door;
var level = 1;
var lifes = 2;
var lifesText;
var questionNumber = 1;
var question;
var item;
var key;

class LevelOne extends Phaser.Scene {
  constructor() {
    super("levelOne");
    // console.log(this.scene.scene.scene.key);
  }

  //set a property

  keyFound = false;

  getKeyFound() {
    return this.keyFound;
  }

  setKeyFound(value) {
    this.keyFound = value;
  }

  collisionWithDoor(player, element) {
    if (!this.getKeyFound()) {
      alert("¡Encuentra la llave para poder continuar!");
      return;
    }
    alert("¡Excelente! Has encontrado la puerte y tienes la llave");
    this.scene.start("levelTwo");
  }

  collisionWithKey(player, element) {
    alert("Has encontrado la llave");
    this.setKeyFound(true);
    element.destroy();
  }

  preload() {
    IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    //Donde aparece el personaje
    player = this.physics.add.sprite(100, 450, "player");
    //remove gravity
    door = this.physics.add.staticGroup(); // Agrega la puerta como objeto estático
    key = this.physics.add.staticGroup(); // Agrega la llave como objeto estático
    //Donde se crea la puerta [la posicion]
    key.create(10, 5, "key");
    door.create(610, 75, "door");

    // platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.physics.world.setBounds(0, 0, 800, 600); // Reemplaza 'width' y 'height' con los valores adecuados

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 5 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, door, this.collisionWithDoor, null, this);

    this.physics.add.collider(player, key, this.collisionWithKey, null, this);
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
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
}

class LevelTwo extends Phaser.Scene {
  constructor() {
    super("levelTwo");
  }
  preload() {
    IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });

    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
  }

  create() {
    this.add.image(400, 300, "bg-level2");

    //Donde aparece el personaje
    player = this.physics.add.sprite(100, 450, "player");
    //remove gravity
    door = this.physics.add.staticGroup(); // Agrega la puerta como objeto estático
    key = this.physics.add.staticGroup(); // Agrega la llave como objeto estático
    //Donde se crea la puerta [la posicion]
    door.create(610, 75, "door");

    // platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.physics.world.setBounds(0, 0, 800, 600); // Reemplaza 'width' y 'height' con los valores adecuados

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 5 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
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
}

const config = {
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

  scene: [LevelOne, LevelTwo], // Define las escenas como un arreglo
};

const game = new Phaser.Game(config);
