import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

import CardScene from "./CardScene.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menu" });
    }

    init() {
        this.savedbgmVolume = localStorage.getItem('bgmVolume') || 100;
        this.savedsfxVolume = localStorage.getItem('sfxVolume') || 100;
    }

    preload() {
        this.load.image("BStart", "/assets/images/BStart.png");
        this.load.image("background", "/assets/images/space.png");
        this.load.image("portrait", "/assets/images/Portrait_Border.png");
        this.load.spritesheet("pMario", "/assets/images/Portrait_Mario.png", { frameHeight: 27, frameWidth: 18}) ;
        this.load.image("pYennefer", "/assets/images/Yennefer_Portada_Recortado.png")
    }

    create() {
        //Background
            this.add.image(400, 250, 'background');

            //const randomBinary = Math.round(Math.random());
            const randomBinary = (Math.random() < 0.1) ? 1 : 0;
            let pmario = this.add.sprite(150, 255, 'pMario', randomBinary);
            pmario.setScale(10)

            let portrait = this.add.image(150, 250, 'portrait');
            portrait.setScale(4)

            let pyen = this.add.image(650, 252, 'pYennefer');
            pyen.setScale(4)

            let portrait2 = this.add.image(650, 250, 'portrait');
            portrait2.setScale(4)
        //Fin Background

        //Botones
            let BStart = new Bstart(this, 380, 250);
            BStart.on('pointerdown', () => this.CardSelect());
            BStart.setOrigin(0.4, 0.4);
            BStart.setScale(0.15, 0.15);
            this.BStart = BStart

            this.settingsButton = this.add.text(400, 400, 'Settings', { fontSize: '32px', fill: '#ffffff' })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.showSettings()
            );   
        //Fin Botones

        //Ajustes
            this.sound.bgmVolume = this.savedbgmVolume / 100;
            this.sound.sfxVolume = this.savedsfxVolume / 100;
            this.settingsContainer = this.add.container();  
        //Fin Ajustes
    }

    update() {
        console.log("BGM: " + this.sound.bgmVolume);
        console.log(this.savedbgmVolume);
        console.log("SFX: " + this.sound.sfxVolume);
        console.log(this.savedsfxVolume);
    }

    CardSelect() {
        console.log("boton");
        //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
        //this.scene.stop('scene_ui');
        this.scene.switch('card');
    }

    showSettings() {
        this.settingsVisible = true;

        this.BStart.disableInteractive();
        this.settingsButton.disableInteractive();

        const settingsBackground = this.add.rectangle(400, 300, 400, 400, 0x000000).setOrigin(0.5);

        const bgmText = this.add.text(320, 150, 'BGM: ', { fontSize: '24px', fill: '#ffffff' });
        const bgmValue = this.add.text(500, 150, this.sound.bgmVolume * 100, { fontSize: '24px', fill: '#ffffff' });

        const sfxText = this.add.text(320, 250, 'SFX: ', { fontSize: '24px', fill: '#ffffff' });
        const sfxValue = this.add.text(500, 250, this.sound.sfxVolume * 100, { fontSize: '24px', fill: '#ffffff' });

        const initialbgmX = 300 + (this.sound.bgmVolume) * 200;
        const initialsfxX = 300 + (this.sound.sfxVolume) * 200;

        const bgmSlider = this.add.rectangle(400, 200, 200, 10, 0xffffff)
        .setOrigin(0.5);
        const bgmHandle = this.add.circle(initialbgmX, 200, 10, 0xff0000)
            .setInteractive({ draggable: true })
        .setOrigin(0.5);
        bgmHandle.on('drag', (pointer, dragX) => {
            dragX = Phaser.Math.Clamp(dragX, 300, 500);
            bgmHandle.x = dragX;
            let volumePercentage = Phaser.Math.RoundTo(((dragX - 300) / 200) * 100);
            bgmValue.setText(volumePercentage);
            this.sound.bgmVolume = volumePercentage / 100;
            localStorage.setItem('bgmVolume', volumePercentage);
        });

        const sfxSlider = this.add.rectangle(400, 300, 200, 10, 0xffffff)
        .setOrigin(0.5);
        const sfxHandle = this.add.circle(initialsfxX, 300, 10, 0xff0000)
            .setInteractive({ draggable: true })
        .setOrigin(0.5);
        sfxHandle.on('drag', (pointer, dragX) => {
            dragX = Phaser.Math.Clamp(dragX, 300, 500);
            sfxHandle.x = dragX;
            let volumePercentage = Phaser.Math.RoundTo(((dragX - 300) / 200) * 100);
            sfxValue.setText(volumePercentage);
            this.sound.sfxVolume = volumePercentage / 100;
            localStorage.setItem('sfxVolume', volumePercentage);
        });


        const controlsP1Text = this.add.text(400, 350, 'Controls Player 1: WASD', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        const controlsP2Text = this.add.text(400, 400, 'Controls Player 2: Arrows', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        const closeButton = this.add.text(400, 450, 'Close', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.hideSettings()
        );

        this.settingsContainer.add([
            settingsBackground,
            bgmText,
            bgmValue,
            bgmSlider,
            bgmHandle,
            sfxText,
            sfxValue,
            sfxSlider,
            sfxHandle,
            controlsP1Text,
            controlsP2Text,
            closeButton
        ]);
    }  

    hideSettings() {
        this.settingsVisible = false;

        this.BStart.setInteractive();
        this.settingsButton.setInteractive();

        this.settingsContainer.removeAll(true);
    }
}