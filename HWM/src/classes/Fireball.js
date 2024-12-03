export default class Fireball extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'fireball');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(256);
        this.body.setOffset(128, 128);
    }

    update() {
        if (this.x > this.scene.physics.world.bounds.width || this.x < 0) {
            this.destroy();
        }
    }
}