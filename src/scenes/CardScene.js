import Bstart from "../classes/BStart.js";
import Carta from "../classes/Carta.js";

export default class CardScene extends Phaser.Scene {
  constructor() {
    super({ key: "card" });
    this.cartas = []; //cartas seleccionables
    this.cartasSeleccionadas = []; //cartas que se seleccionan
    this.desordenarCartas = true; //Booleando para desordenar las cartas
  }

  init() {

  }

  preload() {
    this.load.image("BStart", "/assets/images/BStart.png")
    this.load.image("CartaEstilo1", "/assets/images/CartaD1.png");
    this.load.image("CartaEstilo2", "/assets/images/CartaD2.png");
    this.load.image("BContinuar", "/assets/images/BContinuar.png");

  }

  create() {
    this.cartasSeleccionadas = [];
    this.registry.set('cartasSeleccionadas', []);

    this.clearCards();

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

    if (this.desordenarCartas) {
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

  clearCards() { //Destruye cartas existentes
    this.cartas.forEach(cartaObj => {
      if (cartaObj.sprite) {
        cartaObj.sprite.destroy();
      }
    });

    this.cartas = [];
  }

  //debug para saber si se están seleccionando y cuales y cuando has seleccionado 3
  seleccionarCarta(cartaObj) {
    if (this.cartasSeleccionadas.length < 3 && !this.cartasSeleccionadas.includes(cartaObj.carta)) {
      this.cartasSeleccionadas.push(cartaObj.carta);
      console.log(`Carta seleccionada: ${cartaObj.carta.nombre}`);
      cartaObj.sprite.disableInteractive(); // Desactivar la interacción de la carta seleccionada
      cartaObj.sprite.setAlpha(0.2); // Cambiar la opacidad para indicar que ha sido seleccionada
    }
    else {
      console.log("Ya has seleccionado 3 cartas");
    }
  }

  //con este método me llevo la info al siguiente nivel
  cambiarAEscenaJuego() {
    // Pasar la información de las cartas seleccionadas a la escena del juego
    this.scene.start("game", { cartasSeleccionadas: this.cartasSeleccionadas });
  }
}