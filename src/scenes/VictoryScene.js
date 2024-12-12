export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "victory" });
    }

    init(data) {
        this.WinnerP1 = data.WinnerP1;
        this.cartasSeleccionadas = data.cartasSeleccionadas;
    }

    preload() {
        this.load.image("BContinuar", "/assets/images/BContinuar.png");
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 3;

        if (this.WinnerP1) {
            const victory = this.add.text(screenCenterX, screenCenterY, "Player 1\n  Wins!", { fontFamily: "babelgam", fontSize: "80px" })
                .setOrigin(0.5);
            victory.setStyle({
                fill: "#FE0002",
                stroke: "#FFD987",
                strokeThickness: 6
            })
        }
        else {
            const victory = this.add.text(screenCenterX, screenCenterY, "Player 2\n  Wins!", { fontFamily: "babelgam", fontSize: "80px" })
                .setOrigin(0.5);
            victory.setStyle({
                fill: "#610F7F",
                stroke: "#B9929F",
                strokeThickness: 6
            })
        }

        this.sfx = {
            sfx2: this.sound.add("sfx_2")
        }
    
        this.bgm = {
            bgm1: this.sound.add("bgm_1")
        }

        this.bgm.bgm1.play();

        this.adjustVolumeSettings();

        let botonContinuar = this.add.image(screenCenterX, 2 * screenCenterY, "BContinuar").setScale(0.2).setInteractive();
        botonContinuar.on("pointerdown", () => {
            this.cambiarAMenu();
        });
    }

    update() {

    }

    cambiarAMenu() {
        console.log(this.cartasSeleccionadas);
        this.bgm.bgm1.stop();

        this.scene.start("menu");
    }

    adjustVolumeSettings() {
        let sfxVolume = parseFloat(localStorage.getItem('sfxVolume')) / 100;
        if (isNaN(sfxVolume)) {
          sfxVolume = 1;
        }
        this.setSfxVolume(sfxVolume);
        let bgmVolume = parseFloat(localStorage.getItem('bgmVolume')) / 100;
        if (isNaN(bgmVolume)) {
          bgmVolume = 1;
        }
        this.setBgmVolume(bgmVolume);
    }
    
    setSfxVolume(volume) {
        for (let key in this.sfx) {
            this.sfx[key].setVolume(volume);
        }
    }
    
    setBgmVolume(volume) {
        for (let key in this.bgm) {
            this.bgm[key].setVolume(volume);
        }
    }
}