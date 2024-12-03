const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas para CSS, JS e imágenes
app.use('/css', express.static(path.join(__dirname, '../build')));  // Servir archivos CSS desde sass/build
app.use('/js', express.static(path.join(__dirname, '../js')));           // Servir archivos JS desde js
app.use('/images', express.static(path.join(__dirname, '../imgs')));      // Servir imágenes desde img

// Servir páginas HTML dinámicamente
app.get('/:page', (req, res) => {
  const page = req.params.page;

  // Validación del nombre de la página para evitar rutas inseguras
  if (!/^[a-zA-Z0-9_-]+$/.test(page)) {
    return res.status(400).send('Nombre de página no válido');
  }

  const filePath = path.join(__dirname, '../html', `${page}.html`); // Ruta correcta a los archivos HTML
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err.message);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Redirigir todas las rutas no definidas a home.html
app.get('*', (req, res) => {
  const homePath = path.join(__dirname, '../html', 'main.html'); // Ruta para main.html
  res.sendFile(homePath, (err) => {
    if (err) {
      console.error('Error al cargar home.html:', err.message);
      res.status(500).send('Error en el servidor');
    }
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

