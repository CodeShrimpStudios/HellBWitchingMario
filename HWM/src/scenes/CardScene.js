import Bstart from "../classes/BStart.js";
import Patatas from "../classes/Patatas.js";
import Carta from "../classes/Carta.js";

export default class CardScene extends Phaser.Scene{
    constructor(){
        super({key: "card"});
        this.cartas = []; //cartas seleccionables
        this.cartasSeleccionadas = []; //cartas que se seleccionan
    }

    init(){
        
    }

    preload(){
        this.load.image("BStart", "/assets/images/BStart.png")
        //this.load.image("Patatas", "./assets/images/patatas.jpg")
        this.load.image("Patatas", "/assets/images/patatas.jpg");
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


          //a cada carta le metemos un efecto
          efectos.forEach((efecto, index) => {
            let carta = new Carta(`Carta ${index + 1}`, efecto);
            this.cartas.push({ carta, sprite: null });
          });
      
          // Imágenes de las cartas
            const scale = 0.05; // Reducir el tamaño de las imágenes de las cartas para que quepan mejor
            this.cartas.forEach((cartaObj, index) => {
            const x = 200 + (index % 3) * 200; // Tres cartas por fila, ajustando el espacio
            const y = 50 + Math.floor(index / 3) * 200; // Tres filas, ajustando el espacio
            let cartaSprite = this.add.image(x, y, "Patatas").setScale(scale).setInteractive();
            cartaSprite.on("pointerdown", () => {
                this.seleccionarCarta(cartaObj.carta);
            });
            cartaObj.sprite = cartaSprite;
    });
      
          // Botón para continuar (chusquero ya le meteré imagen chula)
          let botonContinuar = this.add.text(400, 550, "Continuar", { fill: "#0f0" }).setInteractive();
          botonContinuar.on("pointerdown", () => {
            this.cambiarAEscenaJuego();
          });
        }
      
        //debug para saber si se están seleccionando y cuales y cuando has seleccionado 3
        seleccionarCarta(carta) {
          if (this.cartasSeleccionadas.length < 3) {
            this.cartasSeleccionadas.push(carta);
            console.log(`Carta seleccionada: ${carta.nombre}`);
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