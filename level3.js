import Phaser from "phaser";
import { LEVEL_THREE_IMAGES } from "./consts";
var player;
var cursors;
var gameOver = false;
export default class LevelThree extends Phaser.Scene {
  constructor() {
    super("levelThree");
  }

  hacha;
  linterna;
  llave;
  puerta;
  cajaFuerte;
  todoListText;
  numeroSecretos;

  collisionWithHacha(player, element) {
    element.destroy();
    this.todoListText.setText(`
    *Recoge la llave
    *Recoge la linterna        
    *Recoge el hacha - LISTO
    `);
  }

  collisionWithLlave() {}

  collisionWithLiterna() {}

  collisionWithCajaFuerte(player, element) {
    element.setTexture("cajaAbierta");
    this.todoListText.setText("Encuentra las demas");
  }

  preload() {
    LEVEL_THREE_IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });

    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 124,
      frameHeight: 96,
    });
    this.load.audio("song", "/assets/song.mp3");
  }

  create() {
    this.add.image(400, 300, "bg-level3");

    this.todoListText = this.add.text(
      20,
      20,
      `
      *Recoge la llave
      *Recoge la linterna        
      *Recoge el hacha
      `,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      }
    );

    const song = this.sound.add("song");
    song.play();
    song.setVolume(0.3);
    player = this.physics.add.sprite(100, 450, "player");

    this.door = this.physics.add.staticGroup();
    this.llave = this.physics.add.staticGroup();
    this.linterna = this.physics.add.staticGroup();
    this.hacha = this.physics.add.staticGroup();
    this.cajaFuerte = this.physics.add.staticGroup();

    this.door.create(550, 70, "puerta");
    this.llave.create(300, 500, "llave");
    this.linterna.create(750, 500, "linterna");
    this.hacha.create(750, 130, "hacha");
    this.cajaFuerte.create(350, 300, "cajaFuerte");

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

    this.physics.add.collider(
      player,
      this.cajaFuerte,
      this.collisionWithCajaFuerte,
      null,
      this
    );

    this.physics.add.collider(
      player,
      this.hacha,
      this.collisionWithHacha,
      null,
      this
    );

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
  }
}
