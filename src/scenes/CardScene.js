// CardScene.js
import Carta from "../classes/Carta.js";

export default class CardScene extends Phaser.Scene {
    constructor() {
        super({ key: "card" });
        this.selectedCards = {
            controles: null,
            stats: null,
            mapa: null
        }; // Guardar selección por tipo
        this.shuffleEnabled = true; // Flag para activar/desactivar desorden
    }

    preload() {
        this.load.image("cartaReverso", "assets/images/Cartas/CartaD1Esc.jpg"); // Imagen para cartas dadas vuelta
        this.load.image("cartaControles1", "assets/images/Cartas/Horizonal.jpg");
        this.load.image("cartaControles2", "assets/images/Cartas/cartaControles2.png");
        this.load.image("cartaControles3", "assets/images/Cartas/cartaControles3.png");
        this.load.image("cartaStats1", "assets/images/Cartas/cartaStats1.png");
        this.load.image("cartaStats2", "assets/images/Cartas/cartaStats2.png");
        this.load.image("cartaStats3", "assets/images/Cartas/cartaStats3.png");
        this.load.image("cartaMapa1", "assets/images/Cartas/cartaMapa1.png");
        this.load.image("cartaMapa2", "assets/images/Cartas/cartaMapa2.png");
        this.load.image("cartaMapa3", "assets/images/Cartas/cartaMapa3.png");
    }

    create() {
        this.add.text(400, 50, "Selecciona tus cartas", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);

        // Crear columnas de cartas
        this.crearCartas("controles", 100, [
            new Carta("controles", "invertirIzquierdaDerecha", "Invierte los controles izquierda-derecha"),
            new Carta("controles", "invertirArribaAbajo", "Invierte los controles arriba-abajo"),
            new Carta("controles", "deslizante", "Movimiento resbaladizo al detenerse")
        ]);

        this.crearCartas("stats", 300, [
            new Carta("stats", "velocidadExtra", "Incrementa la velocidad"),
            new Carta("stats", "saltoExtra", "Incrementa el salto"),
            new Carta("stats", "vidaExtra", "Gana una vida adicional")
        ]);

        this.crearCartas("mapa", 500, [
            new Carta("mapa", "gravedadReducida", "Reduce la gravedad"),
            new Carta("mapa", "lluviaChampiñones", "Lluvia de champiñones"),
            new Carta("mapa", "relampagoPantalla", "Pantalla parpadeante")
        ]);

        // Botón de continuar
        this.continueButton = this.add.text(400, 550, "Continuar", { font: "20px Arial", fill: "#ffffff" })
            .setOrigin(0.5)
            .setInteractive()
            .setAlpha(0.5)
            .on("pointerdown", () => {
                if (this.validarSeleccion()) {
                    this.transicionarAlJuego();
                }
            });
    }

    crearCartas(tipo, x, cartas) {
        if (this.shuffleEnabled) {
            Phaser.Utils.Array.Shuffle(cartas); // Mezclar cartas si shuffle está activado
        }

        cartas.forEach((carta, index) => {
            const cartaSprite = this.add.image(x, 150 + index * 180, "cartaReverso").setInteractive();

            cartaSprite.on("pointerdown", () => {
                this.seleccionarCarta(tipo, carta, cartaSprite);
            });

            carta.spriteKey = this.obtenerSpritePorTipoYEfecto(tipo, carta.efecto); // Asignar sprite específico
        });

        this.cartas = cartas; // Guardar cartas para referencia
    }

    seleccionarCarta(tipo, carta, cartaSprite) {
        if (this.selectedCards[tipo]) {
            this.selectedCards[tipo].sprite.setTexture("cartaReverso"); // Volver a dar vuelta la anterior
        }

        this.selectedCards[tipo] = { carta, sprite: cartaSprite };
        cartaSprite.setTexture(carta.spriteKey); // Mostrar la carta seleccionada

        this.actualizarBotonContinuar();
    }

    obtenerSpritePorTipoYEfecto(tipo, efecto) {
        const mapping = {
            controles: {
                invertirIzquierdaDerecha: "cartaControles1",
                invertirArribaAbajo: "cartaControles2",
                deslizante: "cartaControles3"
            },
            stats: {
                velocidadExtra: "cartaStats1",
                saltoExtra: "cartaStats2",
                vidaExtra: "cartaStats3"
            },
            mapa: {
                gravedadReducida: "cartaMapa1",
                lluviaChampiñones: "cartaMapa2",
                relampagoPantalla: "cartaMapa3"
            }
        };

        return mapping[tipo]?.[efecto] || "cartaReverso";
    }

    actualizarBotonContinuar() {
        if (this.validarSeleccion()) {
            this.continueButton.setAlpha(1);
        } else {
            this.continueButton.setAlpha(0.5);
        }
    }

    validarSeleccion() {
        return Object.values(this.selectedCards).every(seleccion => seleccion !== null);
    }

    transicionarAlJuego() {
        const cartasSeleccionadas = Object.values(this.selectedCards).map(seleccion => seleccion.carta);

        // Mostrar cartas seleccionadas con descripciones antes de iniciar el juego
        this.mostrarResumenCartas(cartasSeleccionadas, () => {
            this.scene.start("GameScene", { cartasSeleccionadas });
        });
    }

    mostrarResumenCartas(cartas, callback) {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
            this.cameras.main.fadeIn(500, 0, 0, 0);
            this.add.text(400, 50, "Cartas seleccionadas:", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);

            cartas.forEach((carta, index) => {
                this.add.text(400, 150 + index * 100, carta.descripcion, { font: "16px Arial", fill: "#ffffff" }).setOrigin(0.5);
            });

            const continuar = this.add.text(400, 550, "Iniciar juego", { font: "20px Arial", fill: "#ffffff" })
                .setOrigin(0.5)
                .setInteractive()
                .on("pointerdown", callback);
        });
    }
}


// import Bstart from "../classes/BStart.js";
// import Carta from "../classes/Carta.js";

// export default class CardScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "card" });
//     this.cartas = []; //cartas seleccionables
//     this.cartasSeleccionadas = []; //cartas que se seleccionan
//     this.desordenarCartas = true; //Booleando para desordenar las cartas
//   }

//   init() {

//   }

//   preload() {
//     this.load.image("BStart", "/assets/images/BStart.png")
//     this.load.image("CartaEstilo1", "/assets/images/CartaD1.png");
//     this.load.image("CartaEstilo2", "/assets/images/CartaD2.png");
//     this.load.image("BContinuar", "/assets/images/BContinuar.png");

//   }

//   create() {
//     this.cartasSeleccionadas = [];
//     this.registry.set('cartasSeleccionadas', []);

//     this.clearCards();

//     //efectos para las cartas (de momento chusqueros)
//     const efectos = [
//       { vidaExtra: 5 },
//       { velocidadExtra: 5 },
//       { saltoExtra: 5 },
//       { vidaExtra: 10 },
//       { velocidadExtra: 10 },
//       { saltoExtra: 10 },
//       { vidaExtra: 15 },
//       { velocidadExtra: 15 },
//       { saltoExtra: 15 }
//     ];

//     //Para desordenar o no (testing mejor ordenadas)

//     if (this.desordenarCartas) {
//       Phaser.Utils.Array.Shuffle(efectos);
//     }


//     //a cada carta le metemos un efecto
//     efectos.forEach((efecto, index) => {
//       let carta = new Carta(`Carta ${index + 1}`, efecto);
//       this.cartas.push({ carta, sprite: null });
//     });

//     // Imágenes de las cartas
//     const scale = 0.25; // Reducir el tamaño de las imágenes de las cartas para que quepan mejor
//     this.cartas.forEach((cartaObj, index) => {
//       const x = 150 + (index % 3) * 250; // Tres cartas por fila, ajustando el espacio
//       const y = 100 + Math.floor(index / 3) * 180; // Tres filas, ajustando el espacio
//       const imagenCarta = index % 2 === 0 ? "CartaEstilo1" : "CartaEstilo2";
//       let cartaSprite = this.add.image(x, y, imagenCarta).setScale(scale).setInteractive();
//       cartaSprite.on("pointerdown", () => {
//         this.seleccionarCarta(cartaObj);
//       });
//       cartaObj.sprite = cartaSprite;
//     });

//     // Botón para continuar bien
//     let botonContinuar = this.add.image(400, 570, "BContinuar").setScale(0.2).setInteractive();
//     botonContinuar.on("pointerdown", () => {
//       this.cambiarAEscenaJuego();
//     });
//   }

//   clearCards() { //Destruye cartas existentes
//     this.cartas.forEach(cartaObj => {
//       if (cartaObj.sprite) {
//         cartaObj.sprite.destroy();
//       }
//     });

//     this.cartas = [];
//   }

//   //debug para saber si se están seleccionando y cuales y cuando has seleccionado 3
//   seleccionarCarta(cartaObj) {
//     if (this.cartasSeleccionadas.length < 3 && !this.cartasSeleccionadas.includes(cartaObj.carta)) {
//       this.cartasSeleccionadas.push(cartaObj.carta);
//       console.log(`Carta seleccionada: ${cartaObj.carta.nombre}`);
//       cartaObj.sprite.disableInteractive(); // Desactivar la interacción de la carta seleccionada
//       cartaObj.sprite.setAlpha(0.2); // Cambiar la opacidad para indicar que ha sido seleccionada
//     }
//     else {
//       console.log("Ya has seleccionado 3 cartas");
//     }
//   }

//   //con este método me llevo la info al siguiente nivel
//   cambiarAEscenaJuego() {
//     // Pasar la información de las cartas seleccionadas a la escena del juego
//     this.scene.start("game", { cartasSeleccionadas: this.cartasSeleccionadas });
//   }
// }