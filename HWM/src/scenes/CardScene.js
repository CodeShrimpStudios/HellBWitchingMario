import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";
import Carta from "../classes/Carta.js";

export default class CardScene extends Phaser.Scene{
    constructor(){
        super({key: "card"});
        this.cartas = []; //cartas seleccionables
        this.cartasSeleccionadas = []; //cartas que se seleccionan
        this.desordenarCartas = true; //Booleando para desordenar las cartas
    }

    init(){
        
    }

    preload(){
        this.load.image("BStart", "/assets/images/BStart.png")
        //this.load.image("Patatas", "./assets/images/patatas.jpg")
        this.load.image("Patatas", "/assets/images/patatas.jpg");
        this.load.image("CartaEstilo1", "/assets/images/CartaD1.png");
        this.load.image("CartaEstilo2", "/assets/images/CartaD2.png");
        this.load.image("BContinuar", "/assets/images/BContinuar.png");
        
    }

    create(){
        //this.add.image(100, 50, "BStart").setOrigin(0, 0).setScale(0.5, 0.5)
        /** Lo mismo que la línea anterior con clases */
        // let BStart = new Bstart(this, 400, 550);
        // BStart.setInteractive()
        // BStart.on('pointerdown', () => this.StartGame() );
        // BStart.setOrigin(0.4,0.4);
        // BStart.setScale(0.1,0.1);

        
        /** */

        //this.add.image(400, 450, "patatas").setOrigin(0.5, 0.5).setScale(0.1, 0.1)
        /** Lo mismo que la línea anterior con clases */
        // let Carta1 = new Patatas(this, 100, 100);
        // Carta1.setOrigin(0.5, 0.5);
        // Carta1.setScale(0.1, 0.1);

        // let Carta2 = new Patatas(this, 700, 100);
        // Carta2.setOrigin(0.5, 0.5);
        // Carta2.setScale(0.1, 0.1);

        // let Carta3 = new Patatas(this, 100, 450);
        // Carta3.setOrigin(0.5, 0.5);
        // Carta3.setScale(0.1, 0.1);

        // let Carta4 = new Patatas(this, 700, 450);
        // Carta4.setOrigin(0.5, 0.5);
        // Carta4.setScale(0.1, 0.1);






        /**
         * 
         * 
         * 
         */

        
         //efectos para las cartas (de momento chusqueros)
        const efectos = [
            { vidaExtra: 5 },
            { velocidadExtra: 5 },
            { saltoExtra: 5 },
            { vidaExtra: 10 },
            { velocidadExtra: 10 },
            { saltoExtra: 10 },
            { vidaExtra: 15 },
            { velocidadExtra: 15 },
            { saltoExtra: 15 }
          ];

        //Para desordenar o no (testing mejor ordenadas)

        if (this.desordenarCartas){
            Phaser.Utils.Array.Shuffle(efectos);
        }


          //a cada carta le metemos un efecto
          efectos.forEach((efecto, index) => {
            let carta = new Carta(`Carta ${index + 1}`, efecto);
            this.cartas.push({ carta, sprite: null });
          });
      
          // Imágenes de las cartas
            const scale = 0.25; // Reducir el tamaño de las imágenes de las cartas para que quepan mejor
            this.cartas.forEach((cartaObj, index) => {
            const x = 150 + (index % 3) * 250; // Tres cartas por fila, ajustando el espacio
            const y = 100 + Math.floor(index / 3) * 180; // Tres filas, ajustando el espacio
            const imagenCarta = index % 2 === 0 ? "CartaEstilo1" : "CartaEstilo2";
            let cartaSprite = this.add.image(x, y, imagenCarta).setScale(scale).setInteractive();
            cartaSprite.on("pointerdown", () => {
                this.seleccionarCarta(cartaObj);
            });
            cartaObj.sprite = cartaSprite;
    });
      
          // Botón para continuar bien
          let botonContinuar = this.add.image(400, 570, "BContinuar").setScale(0.2).setInteractive();
          botonContinuar.on("pointerdown", () => {
            this.cambiarAEscenaJuego();
          });
        }
      
        //debug para saber si se están seleccionando y cuales y cuando has seleccionado 3
        seleccionarCarta(cartaObj) {
            if (this.cartasSeleccionadas.length < 3 && !this.cartasSeleccionadas.includes(cartaObj.carta)) {
              this.cartasSeleccionadas.push(cartaObj.carta);
              console.log(`Carta seleccionada: ${cartaObj.carta.nombre}`);
              cartaObj.sprite.disableInteractive(); // Desactivar la interacción de la carta seleccionada
              cartaObj.sprite.setAlpha(0.2); // Cambiar la opacidad para indicar que ha sido seleccionada
            } else {
              console.log("Ya has seleccionado 3 cartas");
            }
          }
      
        //con este método me llevo la info al siguiente nivel
        cambiarAEscenaJuego() {
          // Pasar la información de las cartas seleccionadas a la escena del juego
          this.scene.start("game", { cartasSeleccionadas: this.cartasSeleccionadas });
        }
    

    // StartGame() {
    //     console.log("boton");
    //     //this.scene.remove('MenuScene'); // I remove the scene, because I will add again when start the game
    //     //this.scene.stop('scene_ui');
    //     this.scene.switch('game');
    // }
    
}