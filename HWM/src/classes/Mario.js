export default class Mario extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'mario');
        this.setScale(1.5,1.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //Añadi esto para para cambiar a Mario a WASD - Davide
        this.cursors = this.scene.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        this.anims.create({
            key: "mar_idle",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("mario", {frames: [0]}),
        })
        this.anims.create({
            key: "mar_run",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("mario", {frames: [4,5,6]}),
            repeat: -1
        })
        this.anims.create({
            key: "mar_air",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers("mario", {frames: [2]}),
        })
    }

    update() {
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.setVelocityX(200);
            this.flipX = false;
            this.walking = true;
        } 
        else {
            this.setVelocityX(0);
            this.walking = false;
            this.walkAnim = false;
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

        if (this.grounded && this.walking) {
            if (!this.walkAnim) {
                this.play("mar_run");
                this.walkAnim = true;
            }
        }
        else if (!this.grounded) {
            this.play("mar_air");
        }
        else {
            this.play("mar_idle");
            this.walkAnim = false;
        }
    }
}