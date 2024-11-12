import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

import CardScene from "./CardScene.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    }

    init(){

    }

    preload(){
        this.load.image("BStart", "assets/images/BStart.png")
        this.load.image("background", "assets/images/space.png")
    }

    create(){

        this.add.image(400, 250, 'background');

        let BStart = new Bstart(this, 400, 250);
        BStart.on('pointerdown', () => this.CardSelect() );
        BStart.setOrigin(0.4,0.4);
        BStart.setScale(0.2,0.2);


    }

    update(){
        
    }

    CardSelect() {
        console.log("boton");
        //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
        //this.scene.stop('scene_ui');
        this.scene.switch('card');
    }
        
}