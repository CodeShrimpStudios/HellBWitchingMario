export default class Powerup extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        

        // Añadir a la escena
        scene.add.existing(this);

        this.Yennefer = true;
        this.Mario = true;

        scene.physics.world.enable(this); 
        this.body.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        this.body.setImmovable(true);
        
    }


}