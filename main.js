import { LEVEL_ONE_IMAGES, LEVEL_TWO_IMAGES } from "./consts";
// import { displayQuestion, generateQuestion } from "./actions";
import "./style.css";
import Phaser from "phaser";

//Game objects

var player;
var cursors;
var gameOver = false;
var door;
var key;
var book;
class LevelOne extends Phaser.Scene {
  constructor() {
    super("levelOne");
    // console.log(this.scene.scene.scene.key);
  }

  //set a property

  keyFound = false;
  sillon;
  boteBasura;
  sillaIzquierda;
  sillaDerecha;

  getKeyFound() {
    return this.keyFound;
  }

  setKeyFound(value) {
    this.keyFound = value;
  }

  collisionWithDoor(player, element) {
    if (!this.getKeyFound()) {
      this.game.pause();
      alert("¡Encuentra la llave para poder continuar!");
      setTimeout(() => {
        this.game.resume();
      }, 1000);
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
    LEVEL_ONE_IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 107,
      frameHeight: 96,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    //Donde aparece el personaje
    player = this.physics.add.sprite(600, 450, "player");
    //remove gravity
    door = this.physics.add.staticGroup(); // Agrega la puerta como objeto estático
    key = this.physics.add.staticGroup(); // Agrega la llave como objeto estático
    this.sillon = this.physics.add.staticGroup();
    this.boteBasura = this.physics.add.staticGroup();
    this.sillaIzquierda = this.physics.add.staticGroup();
    this.sillaDerecha = this.physics.add.staticGroup();
    //Donde se crea la puerta [la posicion]
    key.create(60, 150, "key");
    door.create(610, 75, "door");
    this.sillon.create(355, 290, "sillon");
    this.boteBasura.create(100, 530, "boteBasura");
    this.sillaIzquierda.create(200, 370, "sillaIzquierda");
    this.sillaDerecha.create(500, 370, "sillaDerecha");

    // platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.physics.world.setBounds(0, 0, 800, 600); // Reemplaza 'width' y 'height' con los valores adecuados

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, door, this.collisionWithDoor, null, this);
    this.physics.add.collider(player, key, this.collisionWithKey, null, this);
    this.physics.add.collider(player, this.sillon, () => {}, null, this);
    this.physics.add.collider(player, this.boteBasua, () => {}, null, this);
    this.physics.add.collider(
      player,
      this.sillaIzquierda,
      () => {},
      null,
      this
    );
    this.physics.add.collider(player, this.sillaDerecha, () => {}, null, this);
    this.physics.add.collider(player, this.boteBasura, () => {}, null, this);

    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown && cursors.up.isDown) {
      player.setVelocityX(-160);
      player.setVelocityY(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown && cursors.up.isDown) {
      player.setVelocityX(160);
      player.setVelocityY(-160);
      player.anims.play("right", true);
    } else if (cursors.left.isDown && cursors.down.isDown) {
      player.setVelocityX(-160);
      player.setVelocityY(160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown && cursors.down.isDown) {
      player.setVelocityX(160);
      player.setVelocityY(160);
      player.anims.play("right", true);
    } else if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-160);
      player.anims.play("up", true);
    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
      player.anims.play("down", true);
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play("turn");
    }

    // Movimiento vertical
  }
}

class LevelTwo extends Phaser.Scene {
  book;
  phone;
  door;
  bookFound = false;
  phoneFound = false;

  setBookFound(value) {
    this.bookFound = value;
  }

  getBookFound() {
    return this.bookFound;
  }

  setPhoneFound(value) {
    this.phoneFound = value;
  }

  getPhoneFound() {
    return this.phoneFound;
  }

  constructor() {
    super("levelTwo");
  }

  collisionWithPhone(player, element) {
    this.setPhoneFound(true);
    if (!this.getBookFound()) {
      alert("¡Encuentra el libro para poder avanzar!");
      element.destroy();
      return;
    }

    if (this.getBookFound() && this.getPhoneFound()) {
      alert("¡Encontraste el celular, avanza al siguiente nivel!");
      element.destroy();
      return;
    }
  }

  collisionWithBook(player, element) {
    this.setBookFound(true);
    if (!this.getPhoneFound()) {
      alert("¡Encuentra el celular para poder avanzar!");
      element.destroy();
      return;
    }

    if (this.getBookFound() && this.getPhoneFound()) {
      alert("¡Encontraste el libro, avanza al siguiente nivel!");
      element.destroy();
      return;
    }
  }

  collisionWithDoor(player, element) {
    if (!this.getBookFound() || !this.getPhoneFound()) {
      alert("¡Encuentra los objetos para poder ver avanzar!");
      return;
    }

    alert(
      "¡Excelente! Has encontrado la puerta y tienes los objetos para avanzar"
    );
  }

  preload() {
    LEVEL_TWO_IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });

    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 124,
      frameHeight: 96,
    });
  }

  create() {
    this.add.image(400, 300, "bg-level2");

    //Donde aparece el personaje
    player = this.physics.add.sprite(100, 450, "player");
    //remove gravity
    this.door = this.physics.add.staticGroup(); // Agrega la puerta como objeto estático
    this.book = this.physics.add.staticGroup();
    this.phone = this.physics.add.staticGroup();
    //Donde se crea la puerta [la posicion]
    this.door.create(610, 75, "door");
    this.book.create(360, 185, "book");
    this.phone.create(700, 400, "phone");

    // platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.physics.world.setBounds(0, 0, 800, 600); // Reemplaza 'width' y 'height' con los valores adecuados

    player.setBounce(0);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 3 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 12 }),
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

    this.physics.add.collider(
      player,
      this.book,
      this.collisionWithBook,
      null,
      this
    );

    this.physics.add.collider(
      player,
      this.phone,
      this.collisionWithPhone,
      null,
      this
    );

    this.physics.add.collider(
      player,
      this.door,
      this.collisionWithDoor,
      null,
      this
    );

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
