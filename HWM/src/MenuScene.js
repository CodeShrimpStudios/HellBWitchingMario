import Kebab from "./Kebab.js";
import Patatas from "./Patatas.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    }

    init(){

    }

    preload(){
        this.load.image("kebab", "./assets/kebab.png")
        this.load.image("patatas", "./assets/patatas.jpg")
    }

    create(){
        //this.add.image(100, 50, "kebab").setOrigin(0, 0).setScale(0.5, 0.5)
        /** Lo mismo que la línea anterior con clases */
        let kebab = new Kebab(this, 100, 50);
        kebab.setOrigin(0,0);
        kebab.setScale(0.5,0.5);
        console.log("He pedido un kebab con", kebab.carne, ",", kebab.verduras,"y", kebab.salsa)
        /** */

        //this.add.image(400, 450, "patatas").setOrigin(0.5, 0.5).setScale(0.1, 0.1)
        /** Lo mismo que la línea anterior con clases */
        let patatas = new Patatas(this, 400, 450);
        patatas.setOrigin(0.5, 0.5);
        patatas.setScale(0.1, 0.1);
        console.log("He pedido unas patatas con salsa", patatas.salsa)
    }

    update(){

    }
}