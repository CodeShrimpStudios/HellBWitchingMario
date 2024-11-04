export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    init() {

    }

    preload() {
        this.load.image("background", "/assets/images/space.png");
        this.load.image("tiles", "/assets/tiles/FireSet.png");
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
