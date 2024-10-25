export default class Patatas extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'Patatas');
        scene.add.existing(this);

    }

    preUpdate(){
        
    }
}