// Referencias a elementos del DOM
const entrada = document.getElementById('entrada');
const botonEjecutar = document.getElementById('botonEjecutar');
const resultado = document.getElementById('resultado');
const mensajeError = document.getElementById('mensajeError');

// Expresión regular: solo letras (con acentos/ñ) y números, sin caracteres especiales ni espacios raros
const PATRON_VALIDO = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
const LONGITUD_MINIMA = 3;

/**
 * Invierte una cadena de texto.
 * @param {string} cadena
 * @returns {string}
 */
function reversarCadena(cadena) {
  return cadena.split('').reverse().join('');
}

/**
 * Valida la cadena ingresada según las reglas de negocio:
 * - longitud mínima de 3 caracteres
 * - sin caracteres especiales
 * @param {string} cadena
 * @returns {{ esValida: boolean, mensaje: string }}
 */
function validarCadena(cadena) {
  if (cadena.length === 0) {
    return { esValida: false, mensaje: '' };
  }

  if (!PATRON_VALIDO.test(cadena)) {
    return { esValida: false, mensaje: 'No se permiten caracteres especiales.' };
  }

  if (cadena.trim().length < LONGITUD_MINIMA) {
    return { esValida: false, mensaje: `La cadena debe tener al menos ${LONGITUD_MINIMA} caracteres.` };
  }

  return { esValida: true, mensaje: '' };
}

/**
 * Maneja el evento de entrada de texto: valida, muestra/oculta el botón
 * y actualiza el resultado en tiempo real.
 */
function manejarEntrada() {
  const valor = entrada.value;
  const { esValida, mensaje } = validarCadena(valor);

  mensajeError.textContent = mensaje;

  if (esValida) {
    botonEjecutar.classList.remove('oculto');
    resultado.textContent = reversarCadena(valor);
  } else {
    botonEjecutar.classList.add('oculto');
    resultado.textContent = '';
  }
}

/**
 * Maneja el clic del botón "Ejecutar" (refuerza la actualización del resultado).
 */
function manejarClicBoton() {
  const valor = entrada.value;
  const { esValida } = validarCadena(valor);

  if (esValida) {
    resultado.textContent = reversarCadena(valor);
  }
}

// Escuchadores de eventos
entrada.addEventListener('input', manejarEntrada);
botonEjecutar.addEventListener('click', manejarClicBoton);
