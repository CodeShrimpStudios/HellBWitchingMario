export default class Fireball extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'fireball');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1, 1);
        this.body.setCircle(10);

        this.anims.create({
            key: 'fireball_anim',
            frameRate: 60,
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 60}),
            repeat: -1
        });
    }

    update() {
        if (this.x > this.scene.physics.world.bounds.width || this.x < 0) {
            this.destroy();
        }
    }
}