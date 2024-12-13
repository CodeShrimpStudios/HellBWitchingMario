import Mario from "../classes/Mario.js";
import Yennefer from "../classes/Yennefer.js";
import Powerup from "../classes/Powerup.js";
import Fireball from "../classes/Fireball.js";
import Mushroom from "../classes/Mushroom.js";

import VictoryScene from "./VictoryScene.js";

export default class GameScene extends Phaser.Scene {

  cursors;

  constructor() {
    super({ key: "game" });
  }

  init(data) {
    this.cartasSeleccionadas = data.cartasSeleccionadas || []; //a ver si funciona    
    console.log ("cartas recibidas", this.cartasSeleccionadas);

    this.fireballCooldownTime = 0; //Para el icono de la fireball
    this.maxCooldownTime = 4990;
  }

  preload() {
    this.load.image("bg1", "/assets/images/Cave_BG/image1.png");
    this.load.image("bg2", "/assets/images/Cave_BG/image2.png");
    this.load.image("bg4", "/assets/images/Cave_BG/image4.png");
    this.load.image("bg5", "/assets/images/Cave_BG/image5.png");
    this.load.image("bg7", "/assets/images/Cave_BG/image7.png");
    this.load.image("bg9", "/assets/images/Cave_BG/image9.png");

    this.load.image("tiles", "/assets/tiles/FireSet.png");
    this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/FinalTilemap.json');
    this.load.spritesheet("mario", "/assets/images/mario_small.png", { frameHeight: 18, frameWidth: 18});
    this.load.spritesheet("yennefer", "/assets/images/Yennefer.png", { frameHeight: 32, frameWidth: 90});

    this.load.image('fireballIcon', 'assets/images/Retro-Fire-Ball.64.png');
    this.load.image('mario_icon', 'assets/images/Mario_Icon.png');
    this.load.image('yennefer_icon', 'assets/images/Yennefer_Icon.png');
    this.load.image('heart_full', 'assets/images/Full_Heart.png');
    this.load.image('heart_empty', 'assets/images/Cracked_Heart.png');

    this.load.image("prueba", "/assets/images/patatas.jpg");
    this.load.image("platformplaceholder", "/assets/images/platformplaceholder.png");
    this.load.spritesheet("powertile", "/assets/tiles/FireSet.png", { frameHeight: 16, frameWidth: 16 });
    this.load.spritesheet("fireball", "/assets/images/FireBall.png", { frameHeight: 100, frameWidth: 100 });
    this.load.spritesheet('mushroom_walk', '/assets/images/Big Mushroom_Walk.png', {frameWidth: 28,frameHeight: 28});

    this.load.audio("sfx_hurt", "/assets/sfx/hurt.mp3");
    this.load.audio("sfx_healing", "/assets/sfx/healing.mp3");
    this.load.audio("sfx_death", "/assets/sfx/death.mp3");
    this.load.audio("sfx_revive", "/assets/sfx/revive.mp3");
    this.load.audio("sfx_explosion_1", "/assets/sfx/explosion_1.mp3");
    this.load.audio("sfx_explosion_2", "/assets/sfx/explosion_2.mp3");
    this.load.audio("sfx_thunder", "/assets/sfx/thunder.mp3");
    this.load.audio("sfx_glitch", "/assets/sfx/glitch.mp3");
    this.load.audio("sfx_powerup", "/assets/sfx/powerup.mp3");
    this.load.audio("sfx_enemy_death", "/assets/sfx/enemy_death.mp3");

    this.load.audio("bgm_3", "/assets/bgm/01_Press_Play.mp3");
    this.load.audio("bgm_4", "/assets/bgm/06_Punch_Out.mp3");
    this.load.audio("bgm_5", "/assets/bgm/18_Level_Up.mp3");
  }

  create() {

    this.physics.world.setBoundsCollision(true, true, true, true);
    this.physics.world.setBounds(0, 0, 7264, 600);
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.worldWidth = this.physics.world.bounds.width;   
    this.controlesHorizontalesInvertidos = false;
    this.controlesVerticalesInvertidos = false;
    this.deslizamiento=false;
    this.potSalto=0;
    this.potVel=0;
    

    //Background
    //  const backgroundImages = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9"];
    //  this.backgroundGroupMario = this.add.group();
    //  this.backgroundGroupYennefer = this.add.group();
    //  for (const bg of backgroundImages) {
    //    const sprite = this.add.tileSprite(400, 300, this.worldWidth, 600, bg).setOrigin(0.5, 0.5);
    //    this.backgroundGroupMario.add(sprite);
    //  }
    // for (const bg of backgroundImages) {
    //    const sprite = this.add.tileSprite(400, 300, this.worldWidth, 600, bg).setOrigin(0.5, 0.5);
    //    this.backgroundGroupYennefer.add(sprite);
    //  }
    //Fin Background


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

      this.bgLayer.setTint(0xAAAAAA);
      this.bgLayer.setAlpha(0.9);

      // Crear una instancia del PowerUp 
      const tilesPerRow = 5;
      const frame= (4 - 1) + ((5 - 1) * tilesPerRow);
      //this.powerUp = new Powerup(this, 100, 150, 'powertile', frame);
      this.powerups = [  
        new Powerup(this, 1100, 120, 'powertile', frame), 
        new Powerup(this, 1824, 300, 'powertile', frame),
        new Powerup(this, 2336, 140, 'powertile', frame),
        new Powerup(this, 2640, 275, 'powertile', frame),
        new Powerup(this, 3250, 140, 'powertile', frame),
        new Powerup(this, 6550, 250, 'powertile', frame), ];;

        


        /*this.powerupGroup = this.physics.add.group({collideWorldBounds: true });
      const powerup = new Powerup(this, 100, 150, 'powertile', frame); this.powerupGroup.add(powerup);

      //this.powerups = [ 
      //  new Powerup(this, 100, 150, 'powertile', frame), 
      //  new Powerup(this, 100, 100, 'powertile', frame), 
      //  new Powerup(this, 100, 200, 'powertile', frame) ]; */
      this.groundLayer.setCollisionByProperty({ colisiona: true });
      this.trampasLayer.setCollisionByProperty({ colisiona: true });
    //Fin Tilemap


    //SFX
      this.sfx_yennefer = {
        hurt: this.sound.add("sfx_hurt"),
        healing: this.sound.add("sfx_healing", { loop: true }),
        death: this.sound.add("sfx_death"),
        revive: this.sound.add("sfx_revive"),
        explosion_1: this.sound.add("sfx_explosion_1"),
        explosion_2: this.sound.add("sfx_explosion_2")
      };

      this.sfx_mario = {
        hurt: this.sound.add("sfx_hurt"),
        healing: this.sound.add("sfx_healing", { loop: true }),
        death: this.sound.add("sfx_death"),
        revive: this.sound.add("sfx_revive")
      };

      this.sfx_map = {
        thunder: this.sound.add("sfx_thunder"),
        glitch: this.sound.add("sfx_glitch"),
        powerup: this.sound.add("sfx_powerup"),
        enemy_death: this.sound.add("sfx_enemy_death"),
        bgm5: this.sound.add("bgm_5", { loop: true })
      }
    //Fin SFX


    //BGM
      this.bgm = {
        bgm3: this.sound.add("bgm_3", { loop: true }),
        bgm4: this.sound.add("bgm_4", { loop: true })
      }

      const bgmKeys = Object.keys(this.bgm);
      const randomBgmKey = bgmKeys[Math.floor(Math.random() * bgmKeys.length)];
      this.selectedBgm = this.bgm[randomBgmKey];
      
      this.selectedBgm.play();

      this.sfxVolume = parseFloat(localStorage.getItem('bgmVolume')) / 100;
      if (isNaN(this.sfxVolume)) {
        this.sfxVolume = 1;
      }
      this.bgmVolume = parseFloat(localStorage.getItem('bgmVolume')) / 100;
      if (isNaN(this.bgmVolume)) {
        this.bgmVolume = 1;
      }

      this.adjustVolumeSettings();
    //Fin BGM
    
    
    //_________________________CARTAS DE CONTROLES_________________________
      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "invertirIzquierdaDerecha") {
          console.log("Aplicando efecto: Invertir controles izquierda-derecha");
          this.invertirControlesHorizontales();
        }
      });

      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "invertirArribaAbajo") {
          console.log("Aplicando efecto: Invertir controles arriba-abajo");
          this.invertirControlesVerticales();
        }
      });

      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "deslizante") {
            console.log("Aplicando efecto: Suelo deslizante");
            this.activarDeslizamiento();
        }
      });

      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "velocidadExtra") {
          console.log("Aplicando efectoaaa: Velocidad extra");
          this.aplicarVelocidadExtra();
        }
      });

      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "saltoExtra") {
          console.log("Aplicando efectoaaaa: Salto extra");
          this.aplicarSaltoExtra();
        }
      });
    //_______________________CARTAS DE CONTROLES___________________________
    
    
    //Personajes & Fisicas
      this.mario = new Mario(this, 0, 400, this.sfx_mario,this.controlesHorizontalesInvertidos,
        this.controlesVerticalesInvertidos,this.deslizamiento,this.potVel, this.potSalto);
      this.physics.add.collider(this.mario, this.groundLayer);
      //Voy a dejar groundLayer comentado hasta que funcione correctamente.

      this.yennefer = new Yennefer(this, 700, 370, this.sfx_yennefer,this.controlesHorizontalesInvertidos,
        this.controlesVerticalesInvertidos,this.deslizamiento,this.potVel, this.potSalto);
      this.physics.add.collider(this.yennefer, this.groundLayer);
      
      this.physics.add.collider(this.mario, this.yennefer, this.marioWin, null, this);
      this.physics.add.overlap(this.mario, this.trampasLayer, this.damageMario, null, this);
      this.physics.add.overlap(this.yennefer, this.trampasLayer, this.damageYennefer, null, this);

      this.mario.setCollideWorldBounds(true);
      this.yennefer.setCollideWorldBounds(true);
      this.yennefer.body.onWorldBounds = true;

      this.physics.add.collider(this.yennefer.fireballs, this.mario, this.fireballHitsMario, null, this);


      // Crear grupo de champiñones
      this.mushroomGroup = this.physics.add.group({
        bounceX: 1,
        bounceY: 0.2,
        collideWorldBounds: true
      });
      //for (let i = 0; i < 5; i++) {
      //  const x = Phaser.Math.Between(200, 800);
      //  const y = Phaser.Math.Between(100, 150);
      //  const mushroom = new Mushroom(this, x, y);
      //  this.mushroomGroup.add(mushroom);
      //}
      const mushroom1 = new Mushroom(this, 150, 400);
      this.mushroomGroup.add(mushroom1);
      const mushroom2 = new Mushroom(this, 1500, 400);
      this.mushroomGroup.add(mushroom2);
      const mushroom3 = new Mushroom(this, 1700, 400);
      this.mushroomGroup.add(mushroom3);
      const mushroom4 = new Mushroom(this, 2200, 400);
      this.mushroomGroup.add(mushroom4);
      const mushroom5 = new Mushroom(this, 3424, 400);
      this.mushroomGroup.add(mushroom5);
      const mushroom6 = new Mushroom(this, 4000, 400);
      this.mushroomGroup.add(mushroom6);
      const mushroom7 = new Mushroom(this, 6640, 400);
      this.mushroomGroup.add(mushroom7);

      // Evitar colisiones entre champiñones y hacer que reboten
      this.physics.add.collider(this.mushroomGroup, this.mushroomGroup, (mushroom1, mushroom2) => {
        mushroom1.setVelocityY(-100);
        mushroom2.setVelocityY(-100);
      });

      // Detectar colisión con los jugadores
      this.physics.add.collider(this.mushroomGroup, this.mario, this.handleMushroomCollision, null, this);
      this.physics.add.collider(this.mushroomGroup, this.yennefer, this.handleMushroomCollision, null, this);

      //Yennefer y Mario colision con Powerup
      this.physics.add.overlap(this.yennefer, this.powerups, this.onPowerupCollisionY, null, this);
      this.physics.add.overlap(this.mario, this.powerups, this.onPowerupCollisionM, null, this);
    //Fin Personajes & Fisicas


    //CARTAS Y EFECTOS EN CREATE
      const jugador = [this.mario, this.yennefer];
      this.cartasSeleccionadas.forEach((carta) => {
        if (carta.efecto === "relampagoPantalla") {
            console.log("Aplicando efecto: Relámpago en pantalla");
            this.iniciarIntervaloRelampagos(); // Llamada al intervalo
        }

        if (carta.efecto === "glitch") {
          console.log("Aplicando efecto: Glitch");
          console.log("Jugadores para el glitch:", jugador);
          this.iniciarIntervaloGlitch(jugador); // Llamar al efecto recurrente
        }

        if (carta.efecto === "gravedadReducida") {
          console.log("Aplicando efecto: Gravedad reducida");
          this.iniciarIntervaloGravedadReducida(); // Llamar al intervalo
        }
        // if (carta.efecto === "velocidadExtra") {
        //   console.log("Aplicando efecto: Velocidad extra");
        //   this.aplicarVelocidadExtra();
        // }
        // if (carta.efecto === "saltoExtra") {
        //   console.log("Aplicando efecto: Salto extra");
        //   this.aplicarSaltoExtra();
        // }
        if (carta.efecto === "vidaExtra") {
          console.log("Aplicando efecto: Vida extra");
          this.aplicarVidaExtra();
        }
      
      });
    //FIN CARTAS Y EFECTOS EN CREATE


    //UI
      this.firballCDBool = false;
      this.fireballIcon = this.add.image(this.screenWidth * 0.9, this.screenHeight * 0.85, 'fireballIcon')
        .setScrollFactor(0)
      .setDepth(1);
      this.cooldownCircle = this.add.graphics()
      .setDepth(0);

      this.progressBarWidth = 500;
      this.progressBarX = (this.screenWidth - this.progressBarWidth) / 2;
      this.progressBarBg = this.add.graphics()
        .fillStyle(0x222222, 0.8)
        .fillRect(this.progressBarX, this.screenHeight * 0.08, this.progressBarWidth, 20)
      .setScrollFactor(0);

      this.progressBar = this.add.graphics()
      .setScrollFactor(0);

      this.marioIndicator = this.add.graphics()
      .setScrollFactor(0);
      this.marioIndicatorIcon = this.add.image();
      this.yenneferIndicator = this.add.graphics()
      .setScrollFactor(0);
      this.yenneferIndicatorIcon = this.add.image();

      this.marioHearts = [];
      this.yenneferHearts = [];

    

        
      this.add.image(this.screenWidth * 0.05, this.screenHeight * 0.25, 'mario_icon').setScale(3.5).setScrollFactor(0);
      for (let i = 0; i < this.mario.maxHp; i++) {
        this.marioHearts.push(this.add.image(this.screenWidth * 0.05, this.screenHeight * 0.35 + (i * 60), 'heart_full')
          .setScale(2)
          .setScrollFactor(0)
        );
      }

      this.add.image(this.screenWidth * 0.95, this.screenHeight * 0.25, 'yennefer_icon').setScale(3).setScrollFactor(0);
      for (let i = 0; i < this.yennefer.maxHp; i++) {
        this.yenneferHearts.push(this.add.image(this.screenWidth * 0.95, this.screenHeight * 0.35 + (i * 60), 'heart_full')
          .setScale(2)
          .setScrollFactor(0)
        );
      }
    //Fin UI


    //Camera
      this.cameras.main.setSize(400, 600)
        .setZoom(2.25)
        .startFollow(this.mario)
        .setBounds(0, 0, this.worldWidth, 600)
        .ignore([
          this.progressBarBg,
          this.progressBar,
          this.marioIndicator,
          this.yenneferIndicator,
          this.fireballIcon,
          this.cooldownCircle,
          this.marioHearts,
          this.yenneferHearts,
          //this.backgroundGroupYennefer
      ]);

      const camera2 = this.cameras.add(400, 0, 400, 600, false, 'camera2')
        .setZoom(2.25)
        .startFollow(this.yennefer)
        .setBounds(0, 0, this.worldWidth, 600)
        .ignore([
          this.progressBarBg,
          this.progressBar,
          this.marioIndicator,
          this.yenneferIndicator,
          this.fireballIcon,
          this.cooldownCircle,
          this.marioHearts,
          this.yenneferHearts,
          //this.backgroundGroupMario
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
          this.powerups,
          this.mushroomGroup,
          //this.backgroundGroupMario,
          //this.backgroundGroupYennefer
      ]);
    //Fin Camera
  }


  //__________________________________CARTAS Y EFECTOS______________________________________________

  //RELAMPAGO
  activarRelampago() {
    console.log("Efecto de relámpago activado");

    this.sfx_map.thunder.play();

    // Crear un destello blanco en la pantalla
    const flash = this.add.rectangle(400, 300, 800, 600, 0xffffff, 1).setDepth(10).setAlpha(0);
    const flash2 = this.add.rectangle(400, 300, 800, 600, 0xffffff, 1).setDepth(10).setAlpha(0);

    const flashTween = this.tweens.add({
        targets: flash,
        alpha: { from: 1, to: 0 },
        duration: 150,
        repeat: 8,
        onComplete: () => flash.destroy()
    });
    const flashTweensing = this.tweens.add({
      targets: flash2,
      alpha: { from: 1, to: 0 },
      duration: 500,
      repeat: 1,
      onComplete: () => flash.destroy()
  });

    // Opcional: Añadir un sonido de relámpago
    //this.sound.play("sfx_explosion_1", { volume: 0.5 });
  }

  iniciarIntervaloRelampagos() {
    console.log("Intervalo de relámpagos iniciado");

    // Función que ejecuta el relámpago y reinicia el temporizador
    const activarRelampagoConIntervalo = () => {
        this.activarRelampago();

        // Elegir un nuevo intervalo aleatorio entre 6 y 10 segundos
        const nuevoIntervalo = Phaser.Math.Between(6000, 10000);

        // Configurar el siguiente relámpago
        this.time.delayedCall(nuevoIntervalo, activarRelampagoConIntervalo);
    };

    // Inicia el primer relámpago
    activarRelampagoConIntervalo();

    
  }

  //GLITCH
  activarGlitch(jugadores) {
    console.log("Efecto de glitch activado");
    console.log("Jugadores dentro del metodo glitch:", jugadores);

    this.sfx_map.glitch.play();

    // Efecto visual: Cambiar tintes rápidos de los jugadores
    jugadores.forEach((jugador) => {
        if (jugador) {
            this.tweens.add({
                targets: jugador,
                tint: { from: 0xffffff, to: 0x00ff00 },
                duration: 50,
                yoyo: true,
                repeat: 5,
                onComplete: () => jugador.clearTint()
            });

            // Efecto mecánico: Teletransportar ligeramente
            const xShift = Phaser.Math.Between(-30, 30);
            const yShift = Phaser.Math.Between(-10, 10);

            const nuevoX = Phaser.Math.Clamp(jugador.x + xShift, 0, this.worldWidth);
            const nuevoY = Phaser.Math.Clamp(jugador.y + yShift, 0, this.physics.world.bounds.height);

            jugador.setPosition(nuevoX, nuevoY);
        }
    });

    // Efecto visual: Flash rápido de la pantalla (opcional)
    const flash = this.add.rectangle(400, 300, 800, 600, 0xff0000, 0.2).setDepth(10).setAlpha(0);
    this.tweens.add({
        targets: flash,
        alpha: { from: 0.5, to: 0 },
        duration: 300,
        onComplete: () => flash.destroy()
    });
  }

  iniciarIntervaloGlitch(jugadores) {
    console.log("Intervalo de glitch iniciado");

    const activarGlitchConIntervalo = () => {
        this.activarGlitch(jugadores); // Pasar los jugadores al glitch

        // Elegir un nuevo intervalo aleatorio entre 5 y 8 segundos
        const nuevoIntervalo = Phaser.Math.Between(5000, 8000);

        // Configurar el siguiente glitch
        this.time.delayedCall(nuevoIntervalo, activarGlitchConIntervalo);
    };

    // Inicia el primer glitch
    activarGlitchConIntervalo();
  }

  //GRAVEDAD
  iniciarIntervaloGravedadReducida() {
    console.log("Intervalo de gravedad reducida iniciado");

    const aplicarGravedadReducida = () => {
        this.reducirGravedad(); // Llamada al efecto principal

        // Configurar el siguiente intervalo
        const nuevoIntervalo = Phaser.Math.Between(10000, 15000); // 10-15 segundos
        this.time.delayedCall(nuevoIntervalo, aplicarGravedadReducida);
    };

    // Inicia el primer efecto
    aplicarGravedadReducida();
  }

  reducirGravedad() {
    console.log("Gravedad reducida activada");

    const gravedadOriginal = this.physics.world.gravity.y; // Guardar la gravedad original
    const nuevaGravedad = gravedadOriginal * 0.7; // Reducir la gravedad al 50%

    // Cambiar la gravedad del mundo
    this.physics.world.gravity.y = nuevaGravedad;
    console.log("Gravedad actual:", nuevaGravedad);

    // Restaurar la gravedad tras 3 segundos
    this.time.delayedCall(3000, () => {
        this.physics.world.gravity.y = gravedadOriginal;
        console.log("Gravedad restaurada:", gravedadOriginal);
    });
  }

  //VELOCIDAD EXTRA
  aplicarVelocidadExtra() {
    console.log("Efecto de velocidad extra aplicado");

    this.potVel+=100;
    // Aumentar la velocidad base y máxima de los jugadores
    // this.mario.baseSpeed += 30;
    // this.mario.topSpeed += 60;

    // this.yennefer.baseSpeed += 30;
    // this.yennefer.topSpeed += 60;

    
  }

  //SALTO AUMENTADO
  aplicarSaltoExtra() {


    this.potSalto+=500;
    // console.log("Efecto de salto extra aplicado");
    // console.log("salto mario antes: ",this.mario.baseJumpStrength)
    // console.log("salto yennefer antes: ",this.yennefer.baseJumpStrength)
    // // Aumentar la fuerza del salto de los jugadores
    // this.mario.baseJumpStrength += 200;
    // this.yennefer.baseJumpStrength += 3000;
    // console.log("salto mario despues: ",this.mario.baseJumpStrength)
    // console.log("salto yennefer despues: ",this.yennefer.baseJumpStrength)

    
  }

  //VIDA EXTRA
  aplicarVidaExtra() {
    console.log("Efecto de vida extra aplicado");

    // Aumentar la vida máxima y actual de los jugadores
    this.mario.maxHp += 1;
    this.mario.hp = this.mario.maxHp;

    this.yennefer.maxHp += 1;
    this.yennefer.hp = this.yennefer.maxHp;

    
  }

  //CONTROLES HORIZONTALES INVERTIDOS
  invertirControlesHorizontales() {
    [this.mario, this.yennefer].forEach((jugador) => {
      
        this.controlesHorizontalesInvertidos=true;
    });
  }

  //CONTROLES VERTICALES INVERTIDOS
  invertirControlesVerticales() {
    [this.mario, this.yennefer].forEach((jugador) => {
      
        this.controlesVerticalesInvertidos=true;
    });
  }

  //ACTIVAR DESLIZAMIENTO
  activarDeslizamiento() {
    console.log("Efecto de suelo deslizante activado");

    [this.mario, this.yennefer].forEach((jugador) => {
        this.deslizamiento = true; // Activar deslizamiento
    });
  }

  //__________________________________CARTAS Y EFECTOS______________________________________________





  damageMario(mario, tile) { 
    if (tile.properties.trampa) { mario.damage(); }
    if (tile.properties.trampa && tile.properties.Flava) {mario.bounceOnLava()}; // cambiar true a si es lava en el suelo
  }

  damageYennefer(yennefer, tile) { 
    if (tile.properties.trampa) { yennefer.damage(); }
    if (tile.properties.trampa && tile.properties.Flava) {yennefer.bounceOnLava()}; // cambiar true a si es lava en el suelo
  }

  fireballHitsMario(mario, fireball) {
    if (fireball.active) {
      fireball.setActive(false);
      fireball.setVisible(false);
      fireball.disableBody(true);
      if (mario.active) { 
        mario.damage();
        this.sfx_yennefer.explosion_2.play();
      }
    }
  }

  onPowerupCollisionY(yennefer, powerup){
    if (powerup && powerup.Yennefer){
      this.sfx_map.powerup.play();
      this.yennefer.powerup = true;
      powerup.Yennefer = false;
      console.log("powerup Yennefer")
    }
  }

  onPowerupCollisionM(mario, powerup){
    if (powerup && powerup.Mario){
      this.sfx_map.powerup.play();
      this.mario.powerup = true;
      powerup.Mario = false;
      console.log("powerup Mario")
    }
  }

  handleMushroomCollision(player, mushroom) {
    console.log(player.body.velocity.x);
    if (player instanceof Mario || player instanceof Yennefer) {
      if (player instanceof Mario && this.mario.isInvincible) {
        this.sfx_map.enemy_death.play();
        mushroom.setActive(false);
        mushroom.setVisible(false);
        mushroom.disableBody(true);
      }
      else {
        player.slowDown(0.5, 3000); // Aplicar la ralentización al jugador usando el nuevo método
        //console.log(`${player.constructor.name} colisionó con un champiñón y fue ralentizado.`);
      }
    }

  }

  marioWin() {
    //Añadan animaciones antes de cambiar de escena
    console.log("Colision!!!");
    this.sound.stopAll();
    this.WinnerP1 = true;
    this.scene.switch('victory', { WinnerP1: this.WinnerP1, cartasSeleccionadas: this.cartasSeleccionadas });
  }

  yenneferWin() {
    console.log("Yennefer");
    this.sound.stopAll();
    this.WinnerP1 = false;
    this.scene.switch('victory', { WinnerP1: this.WinnerP1, cartasSeleccionadas: this.cartasSeleccionadas });
  }

  uiManager() {
    this.yennefer.fireballs.children.each((fireball) => {
      this.uiCamera.ignore(fireball);
    });

    if(!this.previousYenneferFCD) {
      if (this.yennefer.fireballCooldown) {
        this.firballCDBool = true;
      }
    }
    this.previousYenneferFCD = this.yennefer.fireballCooldown;

    //Temporizador para el icono fireball
    if (this.firballCDBool) {
      this.fireballCooldownTime -= this.game.loop.delta;
      if (this.fireballCooldownTime <= 0) {
        this.firballCDBool = false;
      }
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
    this.marioIndicatorIcon.destroy();
    this.marioIndicatorIcon = this.add.image(this.progressBarX + marioPosition, (this.screenHeight * 0.08) - 10, 'mario_icon').setScale(1.5).setScrollFactor(0);
    
    this.yenneferIndicator.clear();
    this.yenneferIndicator.fillStyle(0x6420AA, 1);
    //Violeta para Yennefer
    this.yenneferIndicator.fillRect(this.progressBarX + yenneferPosition - 5, (this.screenHeight * 0.08) - 5, 10, 30);
    this.yenneferIndicatorIcon.destroy();
    this.yenneferIndicatorIcon = this.add.image(this.progressBarX + yenneferPosition, (this.screenHeight * 0.08) - 10, 'yennefer_icon').setScale(1.4).setScrollFactor(0);

    //Vidas
    this.marioHearts.forEach((heart, index) => {
      if (index < this.mario.hp) {
        heart.setTexture('heart_full');
      }
      else {
        heart.setTexture('heart_empty');
      }
    });
    this.yenneferHearts.forEach((heart, index) => {
      if (index < this.yennefer.hp) {
        heart.setTexture('heart_full');
      }
      else {
        heart.setTexture('heart_empty');
      }
    });
  }

  adjustVolumeSettings() {
    this.setSfxVolume(this.sfxVolume);
    this.setBgmVolume(this.bgmVolume);
  }

  setSfxVolume(volume) {
    for (let key in this.sfx_yennefer) {
      this.sfx_yennefer[key].setVolume(volume);
    }
    for (let key in this.sfx_mario) {
      this.sfx_mario[key].setVolume(volume);
    }
    for (let key in this.sfx_map) {
      this.sfx_map[key].setVolume(volume);
    }
  }

  setBgmVolume(volume) {
    for (let key in this.bgm) {
      this.bgm[key].setVolume(volume);
    }
  }

  fadeOutBgm(bgm ,volume) {
    this.tweens.add({
      targets: bgm,
      volume: volume,
      duration: 2000,
    });
  }

  update() {
    this.mario.update();
    this.yennefer.update();
    this.uiManager();

    this.physics.world.once("worldbounds", (body, up, down, left, right) => {
      if (right) {
        this.yenneferWin();
      }
    });

    // Actualizar cada champiñón
    this.mushroomGroup.children.iterate((mushroom) => {
      mushroom.update();
    });

    if (!this.lastInvincible && this.mario.isInvincible) {
      this.fadeOutBgm(this.selectedBgm, 0);
      this.sfx_map.bgm5.setVolume(0);
      this.sfx_map.bgm5.play();
      this.fadeOutBgm(this.sfx_map.bgm5, this.bgmVolume)
    }

    if (this.lastInvincible && !this.mario.isInvincible) {
        this.fadeOutBgm(this.sfx_map.bgm5, 0)
        this.fadeOutBgm(this.selectedBgm, this.bgmVolume);
    }
   
    this.lastInvincible = this.mario.isInvincible;

    //this.backgroundGroupMario.getChildren().forEach((backgroundLayer, index) => {
    //  backgroundLayer.tilePositionX = this.mario.x * (index + 1) * 0.01;
    //});

    //this.backgroundGroupYennefer.getChildren().forEach((backgroundLayer, index) => {
    //  backgroundLayer.tilePositionX = this.yennefer.x * (index + 1) * 0.01;
    //});
  }
}