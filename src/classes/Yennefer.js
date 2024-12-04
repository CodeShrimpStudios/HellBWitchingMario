//Copiado de Mario.js

import Fireball from "./Fireball.js";

export default class Yennefer extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'yennefer');
        //this.setScale(1, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(16, 16);
        this.body.setOffset(0, 2);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.groundedlastFrame = false;
        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;
        this.hasAirJumped = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors = this.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.UP,
            down:Phaser.Input.Keyboard.KeyCodes.DOWN,
            left:Phaser.Input.Keyboard.KeyCodes.LEFT,
            right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
            fireball:Phaser.Input.Keyboard.KeyCodes.J
        });

        this.anims.create({
            key: "yen_idle",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [0,1,2,3,4,5,6]}),
            repeat: -1
        })
        this.anims.create({
            key: "yen_run",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [7,8,9,10,11,12,13,14]}),
            repeat: -1
        })
        this.anims.create({
            key: "yen_air",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [15,16,17]}),
        })

        this.fireballCooldown = false;
        this.cooldownTime = 5000;

        this.fireballs = scene.physics.add.group({
            classType: Fireball,
            runChildUpdate: true,
        });
    }

    update() {
        if (this.cursors.left.isDown && !this.cursors.right.isDown ) {
            this.setVelocityX(-100);
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.setVelocityX(100);
            this.flipX = false;
            this.walking = true;
        } 
        else {
            this.setVelocityX(0);
            this.walking = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.body.onFloor()) {
                //Primer salto
                this.setVelocityY(-200);
            }
            else if (!this.hasAirJumped) {
                //Salto en aire
                this.setVelocityY(-200);
                this.hasAirJumped = true;
            }
        }

        if (!this.body.onFloor()) {
            this.grounded = false;
        }
        else {
            this.grounded = true;
            this.hasAirJumped = false;
        }

        if (this.cursors.fireball.isDown && !this.fireballCooldown) {
            this.shootFireball();
        }

        if (this.groundedlastFrame == false && this.grounded == true) { // acaba de tocar el suelo
            this.anims.stop(); // Cancela la animación de caída
            if (this.walking) {
                if (!this.walkAnim) {
                    this.play("yen_run");
                    this.walkAnim = true;
                }
            }
            else {
                this.play("yen_idle");
                this.walkAnim = false;
            }
        }
        
        if (!this.grounded) {
            this.play("yen_air");
            this.walkAnim = false;
        }
        else if (this.walking) {
            if (!this.walkAnim) {
                this.play("yen_run");
                this.walkAnim = true;
            }
        }
        else {
            this.play("yen_idle");
            this.walkAnim = false;
        }

        this.groundedlastFrame = this.grounded;

    }

    shootFireball() {
        console.log('Fireball shot!');

        const fireball = this.fireballs.get(this.x, this.y, 'fireball').setActive(true).setVisible(true);
        fireball.body.allowGravity = false;
        fireball.play('fireball_anim');
        fireball.setVelocityX(-250);
        fireball.setFlipX(true);
        fireball.body.setOffset(35, 45);
        fireball.setVelocityY(0);

        this.fireballCooldown = true;
        this.scene.time.delayedCall(this.cooldownTime, () => {
            this.fireballCooldown = false;
            console.log('Fireball ready!');
        });
    }
}