// Mushroom.js
export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
    // constructor(scene, x, y) {
    //     super(scene, x, y, 'mushroom');
        
    //     // Agregar este sprite a la escena y configurar la física
    //     scene.add.existing(this);
    //     scene.physics.add.existing(this);
        
    //     // Configurar propiedades del enemigo
    //     this.setCollideWorldBounds(true);
    //     this.setBounce(1);
    //     this.setVelocityX(Phaser.Math.Between(-50, 50)); // Velocidad aleatoria al inicio
    //     this.jumpTimer = scene.time.addEvent({
    //         delay: Phaser.Math.Between(2000, 4000), // Intervalo aleatorio para saltar
    //         callback: this.jump,
    //         callbackScope: this,
    //         loop: true
    //     });
    // }

    constructor(scene, x, y) {
        super(scene, x, y, 'mushroom_walk');
        
        // Agregar este sprite a la escena y configurar la física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Configurar propiedades del enemigo
        this.setGravityY(300); // Asegurar que el champiñón esté afectado por la gravedad
        scene.physics.add.collider(this, scene.tilemapLayer); // Añadir colisión con la capa de tiles del mapa
        scene.physics.add.collider(this, scene.groundLayer); // Añadir colisión con el suelo
        this.setCollideWorldBounds(true);
        
        // Crear animación y reproducirla
        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.play('walk');
    }

    // Lógica para el salto del champiñón
    jump() {
        if (this.body.blocked.down) { // Solo saltar si está en el suelo
            this.setVelocityY(-200); // Saltar hacia arriba
        }
    }

    // Lógica de colisión con los jugadores
    onPlayerCollision(player) {
        player.setVelocityX(player.body.velocity.x * 0.5); // Ralentizar al jugador
        player.health -= 10; // Reducir la salud del jugador
    }

    // Actualización en cada frame
    update() {
        // Si el champiñón está quieto, cambiar dirección
        if (this.body.velocity.x === 0) {
            this.setVelocityX(Phaser.Math.Between(-50, 50));
        }
    }
}