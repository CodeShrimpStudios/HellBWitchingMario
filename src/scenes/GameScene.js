import Mario from "../classes/Mario.js";
import Yennefer from "../classes/Yennefer.js";
import Powerup from "../classes/Powerup.js";
import Fireball from "../classes/Fireball.js";

import VictoryScene from "./VictoryScene.js";

export default class GameScene extends Phaser.Scene {

  cursors;

  constructor() {
    super({ key: "game" });
  }

  init(data) {
    this.cartasSeleccionadas = data.cartasSeleccionadas || []; //a ver si funciona

    this.fireballCooldownTime = 0; //Para el icono de la fireball
    this.maxCooldownTime = 5000;
  }

  preload() {
    this.load.image("background", "/assets/images/space.png");
    this.load.image("tiles", "/assets/tiles/FireSet.png");
    this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/DemoTilemap.json');
    this.load.spritesheet("mario", "/assets/images/mario_small.png", { frameHeight: 18, frameWidth: 18});
    //Cambien a Yennefer
    this.load.spritesheet("yennefer", "/assets/images/Yennefer.png", { frameHeight: 32, frameWidth: 90});
    this.load.image('fireballIcon', 'assets/images/Retro-Fire-Ball.64.png');
    this.load.image("prueba", "/assets/images/patatas.jpg");
    this.load.image("background", "/assets/images/space.png")
    this.load.image("platformplaceholder", "/assets/images/platformplaceholder.png")
    this.load.spritesheet("powertile", "/assets/tiles/FireSet.png", { frameHeight: 16, frameWidth: 16 });
    this.load.spritesheet("fireball", "/assets/images/FireBall.png", { frameHeight: 100, frameWidth: 100 });
  }

  create() {

    this.physics.world.setBoundsCollision(true, true, true, true);
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.worldWidth = this.physics.world.bounds.width;

    //Cartas
      //del array de cartas que se han seleccionado de la pantalla de cartas 
      //las sacamos a consola para ver que se vean, tendremos que añadirlas bien cuand
      //diseñemos las stats de los personajes
      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto.vidaExtra) {
          // Lógica para aumentar la vida del jugador          
          console.log(`Aumentando la vida en ${carta.efecto.vidaExtra}`);
        }
        if (carta.efecto.velocidadExtra) {
          // Lógica para aumentar la velocidad del jugador
          console.log(`Aumentando la velocidad en ${carta.efecto.velocidadExtra}`);
        }
        if (carta.efecto.saltoExtra) {
          // Lógica para aumentar el salto del jugador
          console.log(`Aumentando el salto en ${carta.efecto.saltoExtra}`);
        }
      });
    //Fin Cartas
    
    
    //Cambien el fondo cuando tengan la imagen
    let bg = this.add.image(400, 250, 'background');


    //Tilemap
      this.map = this.make.tilemap({
        key: 'tilemap',
        tileWidth: 16,
        tileHeight: 16
      });

      const tileset1 = this.map.addTilesetImage('FireSet', 'tiles');
      this.bgLayer = this.map.createLayer('Fondo', tileset1);
      this.groundLayer = this.map.createLayer('Ground', tileset1);
      this.trampasLayer = this.map.createLayer('Trampas', tileset1);

      // Crear una instancia del PowerUp 
      const tilesPerRow = 5;
      const frame= (4 - 1) + ((5 - 1) * tilesPerRow);
      this.powerUp = new Powerup(this, 100, 150, 'powertile', frame);

      this.groundLayer.setCollisionByProperty({ colisiona: true });
      this.trampasLayer.setCollisionByProperty({ colisiona: true });
    //Fin Tilemap


    //Personajes & Fisicas
      this.mario = new Mario(this, 0, 0);
      this.physics.add.collider(this.mario, this.groundLayer);
      this.physics.add.overlap(this.mario, this.trampasLayer, this.damageMario, null, this);
      //Voy a dejar groundLayer comentado hasta que funcione correctamente.

      this.yennefer = new Yennefer(this, 600, 0);
      this.physics.add.collider(this.yennefer, this.groundLayer);
      this.physics.add.collider(this.mario, this.yennefer, this.marioWin, null, this);

      this.physics.world.setBounds(0, 0, 800, 600);

      this.mario.setCollideWorldBounds(true);
      this.yennefer.setCollideWorldBounds(true);
      this.yennefer.body.onWorldBounds = true;

      this.physics.add.collider(this.yennefer.fireballs, this.mario, this.fireballHitsMario, null, this);
    //Fin Personajes & Fisicas


    //UI
      this.fireballIcon = this.add.image(this.screenWidth * 0.9, this.screenHeight * 0.85, 'fireballIcon')
        .setScrollFactor(0)
        .setDepth(1);
      this.cooldownCircle = this.add.graphics();
      this.cooldownCircle.setDepth(0);

      this.progressBarWidth = 500;
      this.progressBarX = (this.screenWidth - this.progressBarWidth) / 2;
      this.progressBarBg = this.add.graphics();
      this.progressBarBg.fillStyle(0x222222, 0.8);
      this.progressBarBg.fillRect(this.progressBarX, this.screenHeight * 0.08, this.progressBarWidth, 20)
      this.progressBarBg.setScrollFactor(0);

      this.progressBar = this.add.graphics();
      this.progressBar.setScrollFactor(0);

      this.marioIndicator = this.add.graphics();
      this.marioIndicator.setScrollFactor(0);
      this.yenneferIndicator = this.add.graphics();
      this.yenneferIndicator.setScrollFactor(0);
    //Fin UI


    //Camera
      this.cameras.main.setSize(400, 600);
      this.cameras.main.setZoom(2.25);
      this.cameras.main.startFollow(this.mario);
      this.cameras.main.setBounds(0, 0, 800, 600);

      const camera2 = this.cameras.add(400, 0, 400, 600, false, 'camera2')
        .setZoom(2.25)
        .startFollow(this.yennefer)
        .setBounds(0, 0, 800, 600)
        .ignore([
          this.progressBarBg,
          this.progressBar,
          this.marioIndicator,
          this.yenneferIndicator,
          this.fireballIcon,
          this.cooldownCircle
        ]);

      this.uiCamera = this.cameras.add(0, 0, this.screenWidth, this.screenHeight)
      .setScroll(0, 0)
      .ignore([
        this.map,
        this.bgLayer,
        this.groundLayer,
        this.trampasLayer,
        this.mario,
        this.yennefer,
        this.powerUp,
        bg
      ]);
      this.yennefer.fireballs.children.each((fireball) => {
        this.uiCamera.ignore(fireball);
      });

      this.cameras.main.ignore([
        this.progressBarBg,
        this.progressBar,
        this.marioIndicator,
        this.yenneferIndicator,
        this.fireballIcon,
        this.cooldownCircle
      ]);
    //Fin Camera
  }

  damageMario(mario, tile) { 
    if (tile.properties.trampa) { mario.damage(); }
  }

  fireballHitsMario(mario, fireball) {
    console.log('Fireball hit Mario!');
    if (fireball.active) {
      fireball.setActive(false);
      fireball.setVisible(false);
      console.log('Fireball destroyed');
      if (mario.active) { 
        mario.damage(); 
      }
    }
  }

  marioWin() {
    //Añadan animaciones antes de cambiar de escena
    console.log("Colision!!!");
    this.WinnerP1 = true;
    this.scene.switch('victory', { WinnerP1: this.WinnerP1, cartasSeleccionadas: this.cartasSeleccionadas });
  }

  yenneferWin() {
    console.log("Yennefer");
    this.WinnerP1 = false;
    this.scene.switch('victory', { WinnerP1: this.WinnerP1, cartasSeleccionadas: this.cartasSeleccionadas });
  }

  update() {
    this.mario.update();
    this.yennefer.update();

    this.physics.world.once("worldbounds", (body, up, down, left, right) => {
      if (right) {
        this.yenneferWin();
      }
    });


    //UI
      this.yennefer.fireballs.children.each((fireball) => {
        this.uiCamera.ignore(fireball);
      });

      //Temporizador para el icono fireball
      if (this.yennefer.fireballCooldown) {
        this.fireballCooldownTime -= this.game.loop.delta;
      }
      else {
        this.fireballCooldownTime = this.maxCooldownTime;
      }

      //Calculador del progreso
      let progress = 1 - Math.max(0, this.fireballCooldownTime / this.maxCooldownTime);
      this.cooldownCircle.clear();
      this.cooldownCircle.lineStyle(15, 0x00C04B, 1);
      const startAngle = Phaser.Math.DegToRad(270);
      const endAngle = Phaser.Math.DegToRad(270 + (360 * progress));
      this.cooldownCircle.beginPath();
      if (progress != 0) {
        this.cooldownCircle.arc(this.screenWidth * 0.9, this.screenHeight * 0.85, 35, startAngle, endAngle, false);
      }
      else {
        this.cooldownCircle.arc(this.screenWidth * 0.9, this.screenHeight * 0.85, 35, startAngle - 1, Phaser.Math.DegToRad(270 + (360)), false);
      } 
      this.cooldownCircle.strokePath();

      if (this.fireballCooldownTime != this.maxCooldownTime) {
        this.fireballIcon.setTint(0x555555);
        //Icono más oscuro en cooldown
        }
      else {
        this.fireballIcon.clearTint();
        //Icono normal
      }

      //Barra de progreso
      const marioPosition = (this.mario.x / this.worldWidth) * this.progressBarWidth;
      const yenneferPosition = (this.yennefer.x / this.worldWidth) * this.progressBarWidth;

      this.progressBar.clear();
      this.progressBar.fillStyle(0xC84361, 1);
      this.progressBar.fillRect(this.progressBarX, (this.screenHeight * 0.08), marioPosition, 10);
      this.progressBar.fillStyle(0x8967B3, 1);
      this.progressBar.fillRect(this.progressBarX, (this.screenHeight * 0.08) + 10, yenneferPosition, 10);

      this.marioIndicator.clear();
      this.marioIndicator.fillStyle(0xBF3131, 1);
      //Rojo para Mario
      this.marioIndicator.fillRect(this.progressBarX + marioPosition - 5, (this.screenHeight * 0.08) - 5, 10, 30);
      this.yenneferIndicator.clear();
      this.yenneferIndicator.fillStyle(0x6420AA, 1);
      //Violeta para Yennefer
      this.yenneferIndicator.fillRect(this.progressBarX + yenneferPosition - 5, (this.screenHeight * 0.08) - 5, 10, 30);
    //Fin UI
  }
}