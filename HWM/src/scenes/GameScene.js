import Mario from "../classes/Mario.js";
import Yennefer from "../classes/Yennefer.js";
import Powerup from "../classes/Powerup.js";

import VictoryScene from "./VictoryScene.js";

export default class GameScene extends Phaser.Scene {
    
    cursors;
    
    constructor() {
        super({ key: "game" });
    }

    init(data) {
        this.cartasSeleccionadas = data.cartasSeleccionadas || []; //a ver si funciona
    }

    preload() {
        this.load.image("background", "/assets/images/space.png");
        this.load.image("tiles", "/assets/tiles/FireSet.png");
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/DemoTilemap.json');
        this.load.spritesheet("mario", "/assets/images/mario_small.png", {frameHeight: 18, frameWidth: 18});
        //Cambien a Yennefer
        this.load.spritesheet("yennefer", "/assets/images/mario_small.png", {frameHeight: 18, frameWidth: 18});
        this.load.image("prueba", "/assets/images/patatas.jpg");
        this.load.image("background", "/assets/images/space.png")
        this.load.image("platformplaceholder", "/assets/images/platformplaceholder.png")
        this.load.spritesheet("powertile", "/assets/tiles/FireSet.png", {frameHeight: 16, frameWidth: 16});
    }

    create() {

        this.physics.world.setBoundsCollision(true, true, true, true);

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

        //Cambien el fondo cuando tengan la imagen
        let bg = this.add.image(400, 250, 'background');

         this.map = this.make.tilemap({ 
           key: 'tilemap', 
           tileWidth: 16, 
           tileHeight: 16 
         });


         const tilesPerRow = 5;
         const frame= (4 - 1) + ((5 - 1) * tilesPerRow);
         // Crear una instancia del PowerUp 
         this.powerUp = new Powerup(this, 100, 150, 'powertile', frame);

        const tileset1 = this.map.addTilesetImage('FireSet', 'tiles');

        // funciona con y sin array
        this.groundLayer = this.map.createLayer('Ground', tileset1)

        //this.placeholderplatform = this.physics.add.image(200, 465, 'platformplaceholder').setImmovable();;
        //this.placeholderplatform.body.allowGravity = false;
        //this.placeholderplatform.setCollideWorldBounds(true);
        //this.placeholderplatform.setScale(1.5,1);
//
        this.groundLayer.setCollisionByProperty({ colisiona: true });
        
        this.mario = new Mario(this, 0, 0);
        //this.physics.add.collider(this.mario, this.placeholderplatform);
        this.physics.add.collider(this.mario, this.groundLayer);
        //Voy a dejar groundLayer comentado hasta que funcione correctamente.

        this.yennefer = new Yennefer(this, 600, 0);
        //this.physics.add.collider(this.yennefer, this.placeholderplatform);
        this.physics.add.collider(this.yennefer, this.groundLayer);
        this.physics.add.collider(this.mario, this.yennefer, this.marioWin, null, this);


        this.mario.setCollideWorldBounds(true);
        this.yennefer.setCollideWorldBounds(true);
        this.yennefer.body.onWorldBounds = true;
        
        this.physics.world.setBounds(0, 0, 800, 600);       
        
        this.cameras.main.setSize(400, 600);
        this.cameras.main.setZoom(2.25);
        this.cameras.main.startFollow(this.mario);
        this.cameras.main.setBounds(0, 0, 800, 600);

        const camera2 = this.cameras.add(400, 0, 400, 600, false, 'camera2')
        .setZoom(2.25)
        .startFollow(this.yennefer)
        .setBounds(0, 0, 800, 600);
    }

    marioWin(Mario, Yennefer) {
      //Añadan animaciones antes de cambiar de escena
      console.log("Colision!!!");
      this.WinnerP1 = true;
      this.scene.switch('victory', { WinnerP1: this.WinnerP1 });
    }

    yenneferWin(){
      console.log("Yennefer");
      this.WinnerP1 = false;
      this.scene.switch('victory', { WinnerP1: this.WinnerP1 });
    }

    update() {
      this.mario.update();
      this.yennefer.update();
      this.physics.world.on("worldbounds", (body, up, down, left, right) => {
        if (right){
          this.yenneferWin();
        }
      })
    }
}
