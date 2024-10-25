export default class GameScene extends Phaser.Scene {
    constructor(){
        super({key: "game"});
    }

    init(){

    }
    
    preload(){
        this.load.image("background", "/assets/images/space.png")
    }

    create(){
        this.add.image(400, 250, 'background')
    }
        
}