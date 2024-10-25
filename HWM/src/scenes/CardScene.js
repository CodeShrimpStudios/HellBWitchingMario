import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

export default class CardScene extends Phaser.Scene{
    constructor(){
        super({key: "card"});
    }

    init(){
        
    }

    preload(){
        this.load.image("BStart", "/assets/images/BStart.png")
        this.load.image("Patatas", "./assets/images/patatas.jpg")
    }

    create(){
        //this.add.image(100, 50, "BStart").setOrigin(0, 0).setScale(0.5, 0.5)
        /** Lo mismo que la línea anterior con clases */
        let BStart = new Bstart(this, 400, 500);
        BStart.setInteractive()
        BStart.on('pointerdown', () => this.StartGame() );
        BStart.setOrigin(0.4,0.4);
        BStart.setScale(0.2,0.2);

        
        /** */

        //this.add.image(400, 450, "patatas").setOrigin(0.5, 0.5).setScale(0.1, 0.1)
        /** Lo mismo que la línea anterior con clases */
        let Carta1 = new Patatas(this, 100, 100);
        Carta1.setOrigin(0.5, 0.5);
        Carta1.setScale(0.1, 0.1);

        let Carta2 = new Patatas(this, 700, 100);
        Carta2.setOrigin(0.5, 0.5);
        Carta2.setScale(0.1, 0.1);

        let Carta3 = new Patatas(this, 100, 450);
        Carta3.setOrigin(0.5, 0.5);
        Carta3.setScale(0.1, 0.1);

        let Carta4 = new Patatas(this, 700, 450);
        Carta4.setOrigin(0.5, 0.5);
        Carta4.setScale(0.1, 0.1);
    }

    StartGame() {
        console.log("boton");
        //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
        //this.scene.stop('scene_ui');
        this.scene.switch('game');
    }
    
}