export default class Patatas extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'patatas');
        scene.add.existing(this);
        this.salsa = "barbacoa";

        this.vel = 1; //velocidad
    }

    preUpdate(){
        this.angle += this.vel; //Esto más adelante veremos que está feo y tenemos que hacerlo teniendo en cuenta el tiempo entre frames
    }
}