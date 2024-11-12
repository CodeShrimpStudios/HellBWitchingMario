export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    init(data) {
        this.cartasSeleccionadas = data.cartasSeleccionadas || []; //a ver si funciona

    }

    preload() {
        this.load.image("background", "assets/images/space.png");
        this.load.image("tiles", "assets/tiles/FireSet.png");
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/DemoTilemap.json');
        
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

    }

}
