import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

import CardScene from "./CardScene.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menu" });
    }

    init() {

    }

    preload() {
        this.load.image("BStart", "/assets/images/BStart.png");
        this.load.image("background", "/assets/images/space.png");
        this.load.image("portrait", "/assets/images/Portrait_Border.png");
        this.load.spritesheet("pMario", "/assets/images/Portrait_Mario.png", { frameHeight: 32, frameWidth: 18}) ;
        this.load.image("pYennefer", "/assets/images/Yennefer_SplashArt.png")
    }

    create() {

        this.add.image(400, 250, 'background');

        let pmario = this.add.sprite(150, 290, 'pMario', 0);
        pmario.setScale(10)

        let portrait = this.add.image(150, 250, 'portrait');
        portrait.setScale(4)

        let pyen = this.add.image(650, 350, 'pYennefer');
        pyen.setScale(4)

        let portrait2 = this.add.image(650, 250, 'portrait');
        portrait2.setScale(4)
        

        let BStart = new Bstart(this, 400, 250);
        BStart.on('pointerdown', () => this.CardSelect());
        BStart.setOrigin(0.4, 0.4);
        BStart.setScale(0.2, 0.2);


    }

    update() {

    }

    CardSelect() {
        console.log("boton");
        //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
        //this.scene.stop('scene_ui');
        this.scene.switch('card');
    }

}