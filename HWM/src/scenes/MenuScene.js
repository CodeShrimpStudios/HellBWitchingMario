import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    }

    init(){

    }

    preload(){
        this.load.image("BStart", "/assets/images/BStart.png")
        this.load.image("patatas", "./assets/images/patatas.jpg")
    }

    create(){
        //this.add.image(100, 50, "BStart").setOrigin(0, 0).setScale(0.5, 0.5)
        /** Lo mismo que la línea anterior con clases */
        let BStart = new Bstart(this, 400, 250);
        BStart.setOrigin(0.4,0.4);
        BStart.setScale(0.2,0.2);
        /** */

        //this.add.image(400, 450, "patatas").setOrigin(0.5, 0.5).setScale(0.1, 0.1)
        /** Lo mismo que la línea anterior con clases */
        let patatas = new Patatas(this, 400, 450);
        patatas.setOrigin(0.5, 0.5);
        patatas.setScale(0.1, 0.1);
    }

    update(){

    }
}