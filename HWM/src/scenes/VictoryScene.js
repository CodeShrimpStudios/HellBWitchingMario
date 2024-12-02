//Falta mucho aqui, solo hice lo basico para probar.


export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"});
    }

    init(data) {
        this.WinnerP1 = data.WinnerP1;
    }

    preload(){
        this.load.image("Victory1", "/assets/images/Victory1.png");
        this.load.image("Victory2", "/assets/images/Victory1.png");//Cambiar a Player2 wins
        this.load.image("BContinuar", "/assets/images/BContinuar.png");
    }

    create(){
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 3;

        if (this.WinnerP1){
            const victory = this.add.text(screenCenterX, screenCenterY, "Player 1\n   Wins",{fontFamily:"babelgam",fontSize:"80px"})
            .setOrigin(0.5);
            victory.setStyle({
                fill: "#FE0002",
                stroke:"#FFD987",
                strokeThickness:6
            })
        }
        else {
            const victory = this.add.text(screenCenterX, screenCenterY, "Player 2\n   Wins",{fontFamily:"babelgam",fontSize:"80px"})
            .setOrigin(0.5);
            victory.setStyle({
                fill: "#610F7F",
                stroke:"#B9929F",
                strokeThickness:6
            })
        }

        let botonContinuar = this.add.image(screenCenterX, 2 * screenCenterY, "BContinuar").setScale(0.2).setInteractive();
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