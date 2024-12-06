//Copiado de Mario.js

import Fireball from "./Fireball.js";

export default class Yennefer extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'yennefer');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDisplaySize(this.width * 2/3, this.height * 2/3);
        this.body.setSize((16) * 3/2, (16) * 3/2);
        this.body.setOffset(33, 8);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.maxHorizontalSpeed = 1;
        this.baseJumpStrength = 400;

        this.groundedlastFrame = false;
        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;
        this.idleAnim = false;
        this.jumpAnim = false;
        this.hasAirJumped = false;
        this.isSlowed=false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.cursors = this.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.UP,
            left:Phaser.Input.Keyboard.KeyCodes.LEFT,
            right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
            fireball:Phaser.Input.Keyboard.KeyCodes.DOWN
        });

        this.anims.create({
            key: "yen_idle",
            frameRate: 3,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [0,2,3,4,5,6,0,1,2,3,4,5,6]}),//Añadi mas frames para que no parpadee tanto - Davide
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
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [15,16,17]}),
            repeat: -1
        })
        this.anims.create({
            key: "yen_fireball",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("yennefer", {frames: [21,22,23]}),
            repeat: -1
        })

        this.fireballCooldown = false;
        this.cooldownTime = 5000;
        this.fireballAnimCounter = 0;
        this.fireballAnimDuration = 40;

        this.fireballs = scene.physics.add.group({
            classType: Fireball,
            runChildUpdate: true,
        });
    }

    update() {
        this.inputManager();
        this.animManager();
    }

    shootFireball() {
        console.log('Fireball shot!');

        this.play("yen_fireball");
        this.walkAnim = false;
        this.idleAnim = false;
        this.jumpAnim = false;
        this.fireballAnimCounter = this.fireballAnimDuration;

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

    slowDown(factor, duration) {
        if (!this.isSlowed) {
          this.isSlowed = true;
          this.speed *= factor;
          this.scene.time.delayedCall(duration, () => {
            this.speed /= factor;
            this.isSlowed = false;
          });
        }
    }

    inputManager() {
        if (this.cursors.left.isDown && !this.cursors.right.isDown ) {
            if(this.isSlowed==true){
                this.setVelocityX(-30)
            }
             else{this.setVelocityX(-100)}
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            if(this.isSlowed==true){
                this.setVelocityX(30)
            }
             else{this.setVelocityX(100)}
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
                if(this.isSlowed==true){
                    this.setVelocityY(-120)
                }
                else{this.setVelocityY(-200);}
            }
            else if (!this.hasAirJumped) {
                //Salto en aire
                if(this.isSlowed==true){
                    this.setVelocityY(-120)
                }
                else{this.setVelocityY(-200);}
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

    animManager() {
        if (this.fireballAnimCounter <= 0) {
            if (this.groundedlastFrame == false && this.grounded == true) { // acaba de tocar el suelo
                this.anims.stop(); // Cancela la animación de caída
                if (this.walking) {
                    if (!this.walkAnim) {
                        this.play("yen_run");
                        this.walkAnim = true;
                        this.idleAnim = false;
                        this.jumpAnim = false;
                    }
                }
                else {
                    if (!this.idleAnim) {
                        this.play("yen_idle");
                        this.walkAnim = false;
                        this.idleAnim = true;
                        this.jumpAnim = false;
                    }
                }
            }
            
            if (!this.grounded) {
                if (!this.jumpAnim) {
                    this.play("yen_air");
                    this.walkAnim = false;
                    this.idleAnim = false;
                    this.jumpAnim = true;
                }
            }
            else if (this.walking) {
                if (!this.walkAnim) {
                    this.play("yen_run");
                    this.walkAnim = true;
                    this.idleAnim = false;
                    this.jumpAnim = false;
                }
            }
            else {
                if (!this.idleAnim) {
                    this.play("yen_idle");
                    this.walkAnim = false;
                    this.idleAnim = true;
                    this.jumpAnim = false;
                }
            }
        }
        else {
            this.flipX = false;
            this.fireballAnimCounter--;
        }

        this.groundedlastFrame = this.grounded;
    }
}