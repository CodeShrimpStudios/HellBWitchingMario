export default class Mario extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'mario');
        //this.setScale(1, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(16, 16);
        this.body.setOffset(0, 2);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;

        this.damagecd = 0;
        this.damagecdval = 60;
        this.canbedamaged = true;
        this.isdamaged = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //Añadi esto para para cambiar a Mario a WASD - Davide
        this.cursors = this.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });

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
        this.anims.create({
            key: "mar_damage",
            frameRate: 2,
            frames: this.anims.generateFrameNumbers("mario", {frames: [3, 0]}),
            repeat: -1
        })
    }

    update() {
        if (this.body && this.body.velocity) {
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.setVelocityX(-100);
            if(this.isdamaged == true){
                this.body.velocity.x *= 0.2;
            }
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.setVelocityX(100);
            if(this.isdamaged == true){
                this.body.velocity.x *= 0.2;
            }
            this.flipX = false;
            this.walking = true;
        } 
        else {
            this.setVelocityX(0);
            this.walking = false;
            this.walkAnim = false;
        }
    
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.setVelocityY(-200);
        }

        if (!this.body.onFloor()) {
            this.grounded = false;
        }
        else {
            this.grounded = true;
        }

        if (this.damagecd <= 0) {
            this.canbedamaged = true;
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
        else {
            this.damagecd -= 1;
        }
        this.isdamaged = false;
        }
    }

    damage() {
        console.log("daño")
        //if (this.damagecdbool) {
            this.canbedamaged = false;
            this.play("mar_damage");
            this.damagecd = this.damagecdval;
            this.isdamaged = true;
            this.body.velocity.x *= 0.2;
        //}
    }
}