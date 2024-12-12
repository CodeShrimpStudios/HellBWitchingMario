import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";

import CardScene from "./CardScene.js";

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menu" });
    }

    init() {
        this.savedbgmVolume = localStorage.getItem('bgmVolume') || 50;
        this.savedsfxVolume = localStorage.getItem('sfxVolume') || 100;
    }

    preload() {
        this.load.image("bg1", "assets/images/Cave_BG/1.png");
        this.load.image("bg2", "/assets/images/Cave_BG/2.png");
        this.load.image("bg3", "/assets/images/Cave_BG/3fx.png");
        this.load.image("bg4", "/assets/images/Cave_BG/4.png");
        this.load.image("bg5", "/assets/images/Cave_BG/5.png");
        this.load.image("bg6", "/assets/images/Cave_BG/6fx.png");
        this.load.image("bg7", "/assets/images/Cave_BG/7.png");
        this.load.image("bg8", "/assets/images/Cave_BG/8fx.png");
        this.load.image("bg9", "/assets/images/Cave_BG/9.png");

        this.load.image("logo", "/assets/images/logo.png");
        this.load.image("BStart", "/assets/images/BStart.png");
        this.load.image("portrait", "/assets/images/Portrait_Border.png");
        this.load.spritesheet("pMario", "/assets/images/Portrait_Mario.png", { frameHeight: 27, frameWidth: 18});
        this.load.image("pYennefer", "/assets/images/Yennefer_Portada_Recortado.png");

        this.load.audio("bgm_1", "/assets/bgm/13_Mana_Refill.mp3");
        this.load.audio("sfx_1", "/assets/sfx/menu_1.mp3");
        this.load.audio("sfx_2", "/assets/sfx/menu_2.mp3");
    }

    create() {
        //Background
            const backgroundImages = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9"];
            this.backgroundGroup = this.add.group();
            for (const bg of backgroundImages) {
                const sprite = this.add.tileSprite(400, 300, 800, 600, bg).setOrigin(0.5, 0.5);
                this.backgroundGroup.add(sprite).setTint(0x888888);
            }

            //const randomBinary = Math.round(Math.random());
            const randomBinary = (Math.random() < 0.1) ? 1 : 0;
            let pmario = this.add.sprite(150, 405, 'pMario', randomBinary);
            pmario.setScale(7.5)

            let portrait = this.add.image(150, 400, 'portrait');
            portrait.setScale(3)

            let pyen = this.add.image(650, 402, 'pYennefer');
            pyen.setScale(3)

            let portrait2 = this.add.image(650, 400, 'portrait');
            portrait2.setScale(3)

            let logo = this.add.image(400, 400, 'logo');
            
            logo.setScale(2.25);
            logo.setOrigin(0.5,1.6);
        //Fin Background

        //Botones
            let BStart = new Bstart(this, 380, 385);
            BStart.on('pointerdown', () => this.CardSelect());
            BStart.setOrigin(0.4, 0.4);
            BStart.setScale(0.15, 0.15);
            this.BStart = BStart

            this.settingsButton = this.add.text(400, 550, 'Settings', { fontSize: '32px', fill: '#ffffff' })
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

        //SFX
            this.sfx = {
                sfx1: this.sound.add("sfx_1"),
                sfx2: this.sound.add("sfx_2")
            }
        //Fin SFX

        //BGM
            this.bgm = {
                bgm1: this.sound.add("bgm_1", { loop: true })
            }

            this.bgm.bgm1.play();

            this.adjustVolumeSettings();
            this.lastSfxVolume = this.sound.sfxVolume;
            this.lastBgmVolume = this.sound.bgmVolume;
        //Fin BGM
    }

    update() {
        if (this.lastSfxVolume != this.sound.sfxVolume || this.lastBgmVolume != this.sound.bgmVolume) {
            this.adjustVolumeSettings();
        }
        this.lastSfxVolume = this.sound.sfxVolume;
        this.lastBgmVolume = this.sound.bgmVolume;

        this.backgroundGroup.getChildren().forEach((backgroundLayer, index) => {
            backgroundLayer.tilePositionX += (index + 1) * 0.01;
        });
    }

    CardSelect() {
        console.log("boton");
        //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
        //this.scene.stop('scene_ui');
        this.sfx.sfx2.play();
        this.bgm.bgm1.stop();
        this.scene.switch('card');
    }

    showSettings() {
        this.settingsVisible = true;
        this.sfx.sfx1.play();

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

        bgmHandle.on('dragend', () => {
            this.sfx.sfx2.play();
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

        sfxHandle.on('dragend', () => {
            this.sfx.sfx2.play();
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
        this.sfx.sfx1.play();

        this.BStart.setInteractive();
        this.settingsButton.setInteractive();

        this.settingsContainer.removeAll(true);
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