//Falta mucho aqui, solo hice lo basico para probar.


export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"});
    }

    init(){

    }

    preload(){
        this.load.image("Victory", "/assets/images/Victory1.png");
        this.load.image("BContinuar", "/assets/images/BContinuar.png");
    }

    create(){
        let victory = this.add.image(425, 250, "Victory").setScale(0.2)
        let botonContinuar = this.add.image(400, 400, "BContinuar").setScale(0.2).setInteractive();
        botonContinuar.on("pointerdown", () => {
          this.cambiarAEscenaJuego();
        });
    }

    update(){
        
    }


    cambiarAEscenaJuego() {
        this.scene.start("menu");
    }
        
}