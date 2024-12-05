// Mushroom.js
export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'mushroom_walk');
        
        // Agregar este sprite a la escena y configurar la física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Configurar propiedades del enemigo
        if (!scene.anims.exists('walk')) {
            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
        }
        this.play('walk');
        this.setGravityY(500); // Aumentar la gravedad para un movimiento más estable
        scene.physics.add.collider(this, scene.tilemapLayer); // Añadir colisión con la capa de tiles del mapa
        scene.physics.add.collider(this, scene.groundLayer, this.handleWallCollision, null, this); // Añadir colisión con el suelo y manejar colisiones
        this.setCollideWorldBounds(true);
        this.setScale(0.8); // Reducir tamaño del champiñón para que encaje mejor en el mapa
        this.setBounce(0.2); // Ajustar el rebote para evitar quedarse demasiado quieto
        this.setVelocityX(Phaser.Math.Between(-50, 50)); // Asegurar que se mueva desde el inicio
        
        // Añadir este champiñón al grupo de champiñones de la escena si existe
        if (scene.mushroomGroup) {
            scene.mushroomGroup.add(this);
        }
        
        // Temporizador para saltar ocasionalmente
        this.jumpTimer = scene.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000), // Intervalo aleatorio para saltar
            callback: this.jump,
            callbackScope: this,
            loop: true
        });
    }

    // Lógica para el salto del champiñón
    jump() {
        if (this.body.blocked.down) { // Solo saltar si está en el suelo
            this.setVelocityY(-200); // Saltar hacia arriba
        }
    }

    // Lógica para manejar colisiones con paredes
    handleWallCollision(mushroom, ground) {
        if (mushroom.body.blocked.left || mushroom.body.blocked.right) {
            mushroom.setVelocityX(-mushroom.body.velocity.x); // Cambiar de dirección al golpear una pared
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





// // Mushroom.js
// export default class Mushroom extends Phaser.Physics.Arcade.Sprite {


//      constructor(scene, x, y) {
//         super(scene, x, y, 'mushroom_walk');
        
//         // Agregar este sprite a la escena y configurar la física
//         scene.add.existing(this);
//         scene.physics.add.existing(this);
        
//         // Configurar propiedades del enemigo
//         this.setGravityY(300); // Asegurar que el champiñón esté afectado por la gravedad
//         scene.physics.add.collider(this, scene.tilemapLayer); // Añadir colisión con la capa de tiles del mapa
//         scene.physics.add.collider(this, scene.groundLayer); // Añadir colisión con el suelo
//         this.setCollideWorldBounds(true);
        
//         // Crear animación y reproducirla
//         this.anims.create({
//             key: 'walk',
//             frames: scene.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 5 }),
//             frameRate: 10,
//             repeat: -1
//         });
//         this.play('walk');
//     }

//     // Lógica para el salto del champiñón
//     jump() {
//         if (this.body.blocked.down) { // Solo saltar si está en el suelo
//             this.setVelocityY(-200); // Saltar hacia arriba
//         }
//     }

//     // Lógica de colisión con los jugadores
//     onPlayerCollision(player) {
//         player.setVelocityX(player.body.velocity.x * 0.5); // Ralentizar al jugador
//         player.health -= 10; // Reducir la salud del jugador
//     }



//     // Actualización en cada frame
//     update() {
//         // Si el champiñón está quieto, cambiar dirección
//         if (this.body.velocity.x === 0) {
//             this.setVelocityX(Phaser.Math.Between(-50, 50));
//         }
//     }
// }



// // Mushroom.js
// export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
//     constructor(scene, x, y) {
//         super(scene, x, y, 'mushroom_walk');
        
//         // Agregar este sprite a la escena y configurar la física
//         scene.add.existing(this);
//         scene.physics.add.existing(this);
        
//         // Configurar propiedades del enemigo
//         scene.anims.create({
//             key: 'walk',
//             frames: scene.anims.generateFrameNumbers('mushroom_walk', { start: 0, end: 5 }),
//             frameRate: 10,
//             repeat: -1
//         });
//         this.play('walk');
//         this.setGravityY(500); // Aumentar la gravedad para un movimiento más estable // Asegurar que el champiñón esté afectado por la gravedad
//         scene.physics.add.collider(this, scene.tilemapLayer); // Añadir colisión con la capa de tiles del mapa
//         scene.physics.add.collider(this, scene.groundLayer, this.handleWallCollision, null, this); // Añadir colisión con el suelo y manejar colisiones
//         this.setCollideWorldBounds(true);
//         this.setScale(0.8); // Reducir tamaño del champiñón para que encaje mejor en el mapa
//         this.setBounce(0.2); // Ajustar el rebote para evitar quedarse demasiado quieto // Añadir rebote para evitar quedarse atascado
//         this.setVelocityX(Phaser.Math.Between(-50, 50)); // Asegurar que se mueva desde el inicio // Velocidad inicial no nula para que empiece a moverse // Velocidad inicial aleatoria
        
//         // Temporizador para saltar ocasionalmente
//         this.jumpTimer = scene.time.addEvent({
//             delay: Phaser.Math.Between(2000, 4000), // Intervalo aleatorio para saltar
//             callback: this.jump,
//             callbackScope: this,
//             loop: true
//         });
//     }

//     // Lógica para el salto del champiñón
//     jump() {
//         if (this.body.blocked.down) { // Solo saltar si está en el suelo
//             this.setVelocityY(-200); // Saltar hacia arriba
//         }
//     }

//     // Lógica para manejar colisiones con paredes
//     handleWallCollision(mushroom, ground) {
//         if (mushroom.body.blocked.left || mushroom.body.blocked.right) {
//             mushroom.setVelocityX(-mushroom.body.velocity.x); // Cambiar de dirección al golpear una pared
//         }
//     }
// }
