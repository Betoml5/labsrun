import Phaser from "phaser";
import { LEVEL_FOUR_IMAGES } from "./consts";
import { displayModal } from "./utils";
import "./style.css";

var player;
var cursors;
var gameOver = false;

export default class LevelFour extends Phaser.Scene {
  constructor() {
    super("levelFour");
  }

  avioncito;
  canasta;
  manta;
  moneda;
  muroplantas;
  zapato;
  tijeras;

  elementosEncontrados = {
    avioncito: false,
    moneda: false,
    zapato: false,
    tijeras: false,
  };

  collisionWithAvioncito(player, element) {
    element.destroy();
    this.elementosEncontrados.avioncito = true;

    if (
      this.elementosEncontrados.avioncito &&
      this.elementosEncontrados.moneda &&
      this.elementosEncontrados.zapato &&
      this.elementosEncontrados.tijeras
    ) {
      displayModal("¡Ganaste!", "¡Felicidades!");
    }
  }

  collisionWithMoneda(player, element) {
    element.destroy();
    this.elementosEncontrados.moneda = true;
    if (
      this.elementosEncontrados.avioncito &&
      this.elementosEncontrados.moneda &&
      this.elementosEncontrados.zapato &&
      this.elementosEncontrados.tijeras
    ) {
      displayModal("¡Ganaste!", "¡Felicidades!");
    }
  }

  collisionWithZapato(player, element) {
    element.destroy();
    this.elementosEncontrados.zapato = true;
    if (
      this.elementosEncontrados.avioncito &&
      this.elementosEncontrados.moneda &&
      this.elementosEncontrados.zapato &&
      this.elementosEncontrados.tijeras
    ) {
      displayModal("¡Ganaste!", "¡Felicidades!");
    }
  }

  collisionWithTijeras(player, element) {
    element.destroy();
    this.elementosEncontrados.tijeras = true;
    if (
      this.elementosEncontrados.avioncito &&
      this.elementosEncontrados.moneda &&
      this.elementosEncontrados.zapato &&
      this.elementosEncontrados.tijeras
    ) {
      displayModal("¡Ganaste!", "¡Felicidades!");
    }
  }

  preload() {
    LEVEL_FOUR_IMAGES.forEach((image) => {
      this.load.image(image.name, image.path);
    });

    this.load.image("player", "assets/player.png", {
      frameWidth: 124,
      frameHeight: 96,
    });
    this.load.audio("song", "assets/song.mp3");
  }

  create() {
    this.add.image(400, 300, "bg-level4");
    const song = this.sound.add("song");
    song.play();
    song.setVolume(0.3);
    player = this.physics.add.sprite(100, 450, "player");

    this.canasta = this.physics.add.staticGroup();
    this.manta = this.physics.add.staticGroup();
    this.moneda = this.physics.add.staticGroup();
    this.muroplantas = this.physics.add.staticGroup();
    this.zapato = this.physics.add.staticGroup();
    this.tijeras = this.physics.add.staticGroup();
    this.avioncito = this.physics.add.staticGroup();

    this.tijeras.create(110, 200, "tijeras");
    this.manta.create(100, 200, "manta");
    this.canasta.create(110, 200, "canasta");
    this.moneda.create(488, 248, "moneda");
    this.zapato.create(385, 410, "zapato");
    this.avioncito.create(700, 270, "avioncito");

    this.physics.world.setBounds(0, 0, 800, 600);
    player.setBounce(0);
    player.setCollideWorldBounds(true);

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
      this.avioncito,
      this.collisionWithAvioncito,
      null,
      this
    );
    this.physics.add.collider(
      player,
      this.tijeras,
      this.collisionWithTijeras,
      null,
      this
    );
    this.physics.add.collider(
      player,
      this.zapato,
      this.collisionWithZapato,
      null,
      this
    );
    this.physics.add.collider(
      player,
      this.moneda,
      this.collisionWithMoneda,
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
