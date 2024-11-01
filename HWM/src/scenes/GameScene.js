export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    init() {

    }

    preload() {
        this.load.image("background", "/assets/images/space.png");
        this.load.image("tiles", "/assets/tiles/FireSet.png");
        this.load.tilemapTiledJSON('tilemap', '/assets/tilemap/DemoTilemap.json')
    }

    create() {
        this.add.image(400, 250, 'background')
        const map = this.make.tilemap('tilemap');
        //const tileset = map.addTilesetImage('FireSet', 'tiles');  //error?

        //map.createLayer('Todo', tileset)      //mas error?
    }

}
