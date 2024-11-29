//Copiado de Mario.js

export default class Yennefer extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'yennefer');
        this.setScale(1.5,1.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.grounded = false;
        this.walking = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();

    }

    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(200);
            this.flipX = false;
        } 
        else {
            this.setVelocityX(0);
            this.walking = false;
        }
    
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.setVelocityY(-300);
        }

        if (!this.body.onFloor()) {
            this.grounded = false;
        }
        else {
            this.grounded = true;
        }
    }
}