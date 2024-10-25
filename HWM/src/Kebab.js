export default class Kebab extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'kebab');
        scene.add.existing(this);
        this.carne = "rata";
        this.verduras = "lechuga";
        this.salsa = "barbacoa";

        this.vel = 1; //velocidad
    }

    preUpdate(){
        if(this.x>=this.scene.sys.game.canvas.width){
            this.vel = -1
        } else if (this.x<=0){
            this.vel = 1
        }
        this.x += this.vel; //Esto más adelante veremos que está feo y tenemos que hacerlo teniendo en cuenta el tiempo entre frames
    }
}