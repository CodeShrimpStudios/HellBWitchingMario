export default class Powerup extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y);

        // Añadir a la escena
        scene.add.existing(this);

        
    }


}