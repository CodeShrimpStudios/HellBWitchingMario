import MenuScene from "./scenes/MenuScene.js";
import CardScene from "./scenes/CardScene.js";
import GameScene from "./scenes/GameScene.js";
import VictoryScene from "./scenes/VictoryScene.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [MenuScene, CardScene, GameScene, VictoryScene],	// Decimos a Phaser cual es nuestra escena
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 400 }, 
			debug: false
		} 
	}
};

new Phaser.Game(config);