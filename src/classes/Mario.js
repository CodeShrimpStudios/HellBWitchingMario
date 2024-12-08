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

        this.groundedlastFrame = false;
        this.grounded = false;
        this.walking = false;
        this.walkAnim = false;

        this.damagecdval = 2000;
        this.damageanimcd = 500;
        this.revivetime = 5000;
        this.canbedamaged = true;
        this.isdamaged = false;
        this.isSlowed = false;

        this.maxHp = 4;
        this.hp = 4;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //Añadi esto para para cambiar a Mario a WASD - Davide
        this.cursors = this.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            boost:Phaser.Input.Keyboard.KeyCodes.S
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

    update(cursors) {
        if (!this.isRecovering) {
            this.inputManager();
            this.animManager();
        }

        //console.log("VelMario"+this.body.velocity.x);
        console.log("Ralentizado:"+this.isSlowed);
        
    }

    damage() {   
        if (this.canbedamaged) {
            this.canbedamaged = false;
            this.play("mar_damage");
            this.isdamaged = true;
            this.hp -= 1;
            this.blink();
            if (this.hp <= 0) {
                this.recover();
            }
            else {
                this.scene.time.delayedCall(this.damageanimcd, () => {
                    this.isdamaged = false;
                });
    
                this.scene.time.delayedCall(this.damagecdval, () => {
                    this.canbedamaged = true;
                    this.stopBlinking();
                });
            }
        }
    }

    recover() {
        if (!this.isRecovering && this.hp <= 0) {
            this.isRecovering = true;
            this.canbedamaged = false;
            this.body.enable = false;
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
            console.log(this.body.velocity.x)
            if(this.isSlowed==true){
                this.setVelocityX(-30)
            }
             else{this.setVelocityX(-100)}
            if(this.isdamaged == true){
                this.body.velocity.x *= 0.2;
            }
            this.flipX = true;
            this.walking = true;
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            if(this.isSlowed==true){
                this.setVelocityX(30)
            }
             else{this.setVelocityX(100)}
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
    
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.onFloor()) {
            if(this.isSlowed==true){
                this.setVelocityY(-120)
            }
            else{this.setVelocityY(-200);}
        }

        if (!this.body.onFloor()) {
            this.grounded = false;
        }
        else {
            this.grounded = true;
        }
    }

    animManager() {
        if (this.groundedlastFrame == false && this.grounded == true) { // acaba de tocar el suelo
            this.anims.stop(); // Cancela la animación de caída
        }

        if (!this.isdamaged) {
            if (this.groundedlastFrame == false && this.grounded == true) { // acaba de tocar el suelo
                this.anims.stop(); // Cancela la animación de caída
                if (this.walking) {
                    if (!this.walkAnim) {
                        this.play("mar_run");
                        this.walkAnim = true;
                    }
                }
                else {
                    this.play("mar_idle");
                    this.walkAnim = false;
                }
            }
            
            if (!this.grounded) {
                this.play("mar_air");
                this.walkAnim = false;
            }
            else if (this.walking) {
                if (!this.walkAnim) {
                    this.play("mar_run");
                    this.walkAnim = true;
                }
            }
            else {
                this.play("mar_idle");
                this.walkAnim = false;
            }
        }
        else {

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