// Carta.js
export default class Carta {
  constructor(tipo, efecto, descripcion) {
      this.tipo = tipo; // 'controles', 'stats', 'mapa'
      this.efecto = efecto; // función o nombre del efecto a aplicar
      this.descripcion = descripcion; // texto descriptivo para mostrar al jugador
  }

  aplicarEfecto(jugador, escena) {
      // Lógica para aplicar el efecto según el tipo
      switch (this.tipo) {
          case 'controles':
              this.aplicarEfectoControles(jugador);
              break;
          case 'stats':
              this.aplicarEfectoStats(jugador);
              break;
          case 'mapa':
              this.aplicarEfectoMapa(escena);
              break;
          default:
              console.error('Tipo de carta desconocido:', this.tipo);
      }
  }

  aplicarEfectoControles(jugador) {
      switch (this.efecto) {
          case 'invertirIzquierdaDerecha':
              jugador.invertirControles('horizontal');
              break;
          case 'invertirArribaAbajo':
              jugador.invertirControles('vertical');
              break;
          case 'deslizante':
              jugador.activatePeriodicSliding(5000, 3000); // Ejemplo
              break;
          default:
              console.error('Efecto de controles desconocido:', this.efecto);
      }
  }

  aplicarEfectoStats(jugador) {
      switch (this.efecto) {
          case 'velocidadExtra':
              jugador.incrementarVelocidad(20); // Incremento en velocidad
              break;
          case 'saltoExtra':
              jugador.incrementarSalto(50); // Incremento en salto
              break;
          case 'vidaExtra':
              jugador.incrementarVida(1); // Incremento en vida
              break;
          default:
              console.error('Efecto de stats desconocido:', this.efecto);
      }
  }

  aplicarEfectoMapa(escena) {
      switch (this.efecto) {
          case 'gravedadReducida':
              escena.physics.world.gravity.y *= 0.5; // Reducir gravedad
              break;
          case 'glitch':
              escena.glitch(); // Invocar método de la escena
              break;
          case 'relampagoPantalla':
              escena.activarRelampago(); // Efecto visual de relámpagos
              break;
          default:
              console.error('Efecto de mapa desconocido:', this.efecto);
      }
  }
}



// export default class Carta {
//     constructor(nombre, efecto) {
//       this.nombre = nombre;
//       this.efecto = efecto; // Puede ser un objeto que describa el tipo de poder, como {vidaExtra: 10}
//     }
//   }
  