import Mario from "../classes/Mario.js";

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
        this.load.image("prueba", "/assets/images/patatas.jpg");
        this.load.image("background", "/assets/images/space.png")
        this.load.image("platformplaceholder", "/assets/images/platformplaceholder.png")
    }

    create() {
        //this.add.image(400, 250, 'background')
        //const map = this.make.tilemap({ key: 'tilemap' });
        //const map = this.make.tilemap('tilemap');
        //const tiles = map.addTilesetImage('FireSet', 'tiles');
        //const tileset = map.addTilesetImage('FireSet', 'tiles');  //error?
        //const layer = map.createLayer(0, tiles, 0, 0);
        //map.createLayer('Capa', tileset)      //mas error?
        // Aplicar los efectos de las cartas seleccionadas

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

        const tileset1 = this.map.addTilesetImage('FireSet 2', 'tiles');

        // funciona con y sin array
        this.groundLayer = this.map.createLayer('Ground', tileset1)

        this.placeholderplatform = this.physics.add.image(200, 465, 'platformplaceholder').setImmovable();;
        this.placeholderplatform.body.allowGravity = false;
        this.placeholderplatform.setCollideWorldBounds(true);
        this.placeholderplatform.setScale(1.5,1);

        this.mario = new Mario(this, 0, 0);
        this.physics.add.collider(this.mario, this.placeholderplatform);

        
        
        //No se si esto sigue sirviendo, lo utilze para mi personaje de prueba
        this.cursors = this.input.keyboard.createCursorKeys();

        this.mario.setCollideWorldBounds(true);
        
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.physics.world.setBounds(0, 0, 800, 600);       
        
        //La camara solo ocupa mitad de pantalla. Si necesitas pantalla completa cambia setSize a (800,600)
        this.cameras.main.setSize(400, 600);
    
        let camera2 = this.cameras.add(400, 0, 400, 600, false)
        //this.camera2.setZoom(1.5)

        this.cameras.main.setZoom(1.75);
        this.cameras.main.startFollow(this.mario);
    }

    update() {
        this.mario.update();
    }


    
}
