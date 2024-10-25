export default class Bstart extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'BStart');
        scene.add.existing(this);

        this.vel = 0; //velocidad
    }

    preUpdate(){
    }
}