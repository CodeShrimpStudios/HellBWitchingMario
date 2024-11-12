export default class Mario extends Phaser.Physics.Arcade.Image
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'mario');
        this.setScale(0.01,0.01);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.grounded = false;
        this.jumping = false;
        this.movingLeft = false;

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
        }
    }
}