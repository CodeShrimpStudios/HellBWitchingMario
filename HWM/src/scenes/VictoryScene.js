//Falta mucho aqui, solo hice lo basico para probar.


export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"});
    }

    init(data) {
        this.winnerP1 = data.winnerP1;
    }

    preload(){
        this.load.image("Victory1", "/assets/images/Victory1.png");
        this.load.image("Victory2", "/assets/images/Victory1.png");//Cambiar a Player2 wins
        this.load.image("BContinuar", "/assets/images/BContinuar.png");
    }

    create(){
        if (this.winnerP1){
            let victory = this.add.image(425, 250, "Victory1").setScale(0.2)
        }
        else {
            let victory = this.add.image(425, 250, "Victory2").setScale(0.2)
        }
        
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