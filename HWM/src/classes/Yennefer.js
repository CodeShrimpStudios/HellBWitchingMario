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

        this.grounded = false;
        this.walking = false;
        this.hasAirJumped = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors = this.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.UP,
            down:Phaser.Input.Keyboard.KeyCodes.DOWN,
            left:Phaser.Input.Keyboard.KeyCodes.LEFT,
            right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
            fireball:Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
        });

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
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.setVelocityX(100);
            this.flipX = false;
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
    }

    shootFireball() {
        console.log('Fireball shot!');

        const fireball = this.fireballs.get(this.x, this.y, 'fireball').setActive(true).setVisible(true);
        fireball.body.allowGravity = false;
        fireball.play('fireball_anim');
            if (this.flipX) {
                fireball.setVelocityX(-250);
                fireball.setFlipX(true);
                fireball.body.setOffset(35, 45);
                }
            else {
                fireball.setVelocityX(250);
                fireball.setFlipX(false);
                fireball.body.setOffset(45, 45);
            }
        fireball.setVelocityY(0);

        this.fireballCooldown = true;
        this.scene.time.delayedCall(this.cooldownTime, () => {
            this.fireballCooldown = false;
            console.log('Fireball ready!');
        });
    }
}