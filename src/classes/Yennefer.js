//Copiado de Mario.js

import Fireball from "./Fireball.js";

export default class Yennefer extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, sfx, invertirControlesHorizontales, invertirControlesVerticales, deslizamiento, velocidad, salto)
    {
        super(scene, x, y, 'yennefer');

        this.sfx = sfx;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDisplaySize(this.width * 2/3, this.height * 2/3);
        this.body.setSize((16) * 3/2, (16) * 3/2);
        this.body.setOffset(33, 8);
        this.baseSpeed = 50;
        this.topSpeed = 175+velocidad;
        this.accelSpeed = 200;
        this.baseJumpStrength = 400+salto;

        console.log("Potencia trasConstructor",this.baseJumpStrength);

        this.setCollideWorldBounds(true);

        this.isAlive = false;

        this.groundedlastFrame = false;
        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;
        this.idleAnim = false;
        this.jumpAnim = false;
        this.hasAirJumped = false;
        this.isSliding = deslizamiento;

        this.damagecdval = 2000;
        this.damageanimcd = 500;
        this.revivetime = 5000;
        this.canbedamaged = true;
        this.isdamaged = false;
        this.isSlowed=false;
        
        this.powerup = false;

        this.maxHp = 4;
        this.hp = 4;

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        console.log("CONTROLES DE YENNEFER INVERTIDOS: ", this.invertirControlesHorizontales)

        if(invertirControlesHorizontales){
            console.log ("controles invertidos")
            this.cursors = this.scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.UP,
                left:Phaser.Input.Keyboard.KeyCodes.RIGHT,
                right:Phaser.Input.Keyboard.KeyCodes.LEFT,
                fireball:Phaser.Input.Keyboard.KeyCodes.DOWN
            });
        }
        else if(invertirControlesVerticales)
            {
            this.cursors = this.scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.DOWN,
                left:Phaser.Input.Keyboard.KeyCodes.LEFT,
                right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
                fireball:Phaser.Input.Keyboard.KeyCodes.UP
            });
        }
        else{
            console.log ("controles normales")

            this.cursors = this.scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.UP,
                left:Phaser.Input.Keyboard.KeyCodes.LEFT,
                right:Phaser.Input.Keyboard.KeyCodes.RIGHT,
                fireball:Phaser.Input.Keyboard.KeyCodes.DOWN
            });
        }
        

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
        if (!this.isRecovering) {
            this.inputManager();
            this.animManager();
        }        
    }

    damage() {   
        if (this.canbedamaged) {
            this.canbedamaged = false;
            this.isdamaged = true;
            this.hp -= 1;
            this.blink();
            if (this.hp <= 0) {
                this.sfx.healing.play();
                this.sfx.death.play();
                this.recover();
            }
            else {
                this.sfx.hurt.play();
                this.scene.time.delayedCall(this.damageanimcd, () => {
                    this.isdamaged = false;
                    this.anims.stop();
                });
    
                this.scene.time.delayedCall(this.damagecdval, () => {
                    this.canbedamaged = true;
                    this.stopBlinking();
                });
            }
        }
    }

    bounceOnLava() {
        this.setVelocityY(-200);
    }

    shootFireball() {
        console.log('Fireball shot!');

        this.walkAnim = false;
        this.idleAnim = false;
        this.jumpAnim = false;
        this.fireballCooldown = true;


        this.fireball();

        if (this.powerup) {
            this.powerup = false
            this.scene.time.delayedCall(1000, () => {
                this.fireball();
            });
            this.scene.time.delayedCall(2000, () => {
                this.fireball();
            }); 
        }

        this.scene.time.delayedCall(this.cooldownTime, () => {
            this.fireballCooldown = false;
            console.log('Fireball ready!');
        }); 
    }

    fireball() {
        this.sfx.explosion_1.play();

        this.play("yen_fireball");
        this.fireballAnimCounter = this.fireballAnimDuration;

        const fireball = this.fireballs.get(this.x, this.y, 'fireball').setActive(true).setVisible(true);
        fireball.body.allowGravity = false;
        fireball.play('fireball_anim');
        fireball.setVelocityX(-250);
        fireball.setFlipX(true);
        fireball.body.setOffset(35, 45);
        fireball.setVelocityY(0);
    }

    recover() {
        if (!this.isRecovering && this.hp <= 0) {
            this.isRecovering = true;
            this.canbedamaged = false;
            this.body.enable = false;
            this.setAccelerationX(0);
            this.setVelocityX(0);

            this.stopBlinking();
            this.setTint(0x999999);
            this.scene.time.addEvent({
                delay: this.revivetime/this.maxHp,
                //Siempre  5 segundos, pero si tienes mas MaxHp, se te regenera mas rapido cada Hp (Total sigue siendo 5 sec)
                repeat: this.maxHp - 1,
                callback: () => {
                    this.hp += 1;
                    if (this.hp >= this.maxHp) {
                        this.hp = this.maxHp;
                        this.isRecovering = false;
                        this.isdamaged = false;
                        this.body.enable = true;
                        this.blink();
                        this.clearTint();
                        this.sfx.healing.stop();
                        this.sfx.revive.play();

                        //2 sec de invulnerabilidad
                        this.scene.time.delayedCall(this.damagecdval, () => {
                            this.canbedamaged = true;
                            this.stopBlinking();    
                        }, [], this);
                    }
                },
                callbackScope: this
            });
        }
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
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            if(this.isSlowed==true){
                this.body.maxSpeed = this.topSpeed / 2;
                this.setAccelerationX(-this.accelSpeed);
            }
             else{
                this.body.maxSpeed = this.topSpeed;
                if (this.body.velocity.x > -this.baseSpeed) {
                    this.setVelocityX(-this.baseSpeed);
                }
                this.setAccelerationX(-this.accelSpeed);
             }
            if(this.isdamaged == true){
                this.body.velocity.x *= 0.2;
            }
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            if(this.isSlowed==true){
                this.body.maxSpeed = this.topSpeed / 2;
                this.setAccelerationX(this.accelSpeed);
            }
            else{
                this.body.maxSpeed = this.topSpeed;
                if (this.body.velocity.x < this.baseSpeed) {
                    this.setVelocityX(this.baseSpeed);
                }
                this.setAccelerationX(this.accelSpeed);
            }
            if(this.isdamaged == true){
                this.body.velocity.x *= 0.2;
            }
            this.flipX = false;
            this.walking = true;
        } 
        else {
            //console.log("deslizamiento yennefer: ", this.isSliding)
            this.setAccelerationX(0);
            if (this.body.velocity.x > 5) {
                this.body.velocity.x -= 5;
            }
            else if (this.body.velocity.x < -5) {
                this.body.velocity.x += 5;
            }
            else if(this.isSliding) {
                
                // Aplicar inercia cuando no hay teclas de dirección presionadas
                this.setVelocityX(this.body.velocity.x /0.3);
            }
            else {
                this.setVelocityX(0);
            }
            this.walking = false;
            this.walkAnim = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.body.onFloor()) {
                //Primer salto
                if(this.isSlowed==true){
                    this.setVelocityY(-this.baseJumpStrength/2.5)
                }
                else{this.setVelocityY(-this.baseJumpStrength/2);}
            }
            else if (!this.hasAirJumped) {
                //Salto en aire
                if(this.isSlowed==true){
                    this.setVelocityY(-this.baseJumpStrength/3.5)
                }
                else{this.setVelocityY(-this.baseJumpStrength/2);}
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

        if (Phaser.Input.Keyboard.JustDown(this.cursors.fireball) && !this.fireballCooldown) {
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

    blink() {
        this.blinking = this.scene.tweens.add({
            targets: this,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 100
        });
    }

    stopBlinking() {
        if (this.blinking) {
            this.blinking.stop();
            this.setAlpha(1);
        }
    }
}