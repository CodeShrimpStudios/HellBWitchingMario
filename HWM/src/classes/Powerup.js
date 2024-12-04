export default class Powerup extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        

        // Añadir a la escena
        scene.add.existing(this);

        
    }


}