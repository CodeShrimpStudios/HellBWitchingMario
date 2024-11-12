export default class GameScene extends Phaser.Scene {
    
    player;
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
        this.load.image("prueba", "/assets/images/patatas.jpg");
        this.load.image("background", "/assets/images/space.png")

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

        let bg = this.add.image(400, 250, 'background');

        this.map = this.make.tilemap({ 
            key: 'tilemap', 
            tileWidth: 16, 
            tileHeight: 16 
          });

          const tileset1 = this.map.addTilesetImage('FireSet 2', 'tiles');

          // funciona con y sin array
this.groundLayer = 
this.map.createLayer('Ground'
                           , tileset1)




    


    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.physics.add.sprite(300, 400, 'prueba')
    this.player.setScale(.03,.03)
    this.player.setCollideWorldBounds(true);
    
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);       
    
    this.cameras.main.setZoom(2)
    this.cameras.main.startFollow(this.player)
}

    update(){

        const speed = 100

        this.player.setVelocity(0)
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-speed)
        }
        if (this.cursors.right.isDown){
            this.player.setVelocityX(speed)
        }
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-speed);
        }
        if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(speed);
        }
    }

    
}
