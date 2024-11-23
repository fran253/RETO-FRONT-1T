const imagenesPago = document.querySelectorAll('.imagen__pago');

imagenesPago.forEach((imagen) => {
  imagen.addEventListener('click', () => {
    // Quitar la clase 'activo' de todos los recuadros
    imagenesPago.forEach((btn) => btn.classList.remove('activo'));
    // Agregar la clase 'activo' al recuadro clickeado
    imagen.classList.add('activo');
  });
});
