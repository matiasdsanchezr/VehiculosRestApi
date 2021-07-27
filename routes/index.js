const express = require('express');

// Importar rutas de la api
// const propietario = require('./propietario')
const vehiculos = require('./vehiculos');

// Registrar rutas
const router = express.Router();
router.use('/vehiculos', vehiculos);

// Ruta por defecto al ingresar en una pagina no registrada
router.use('/*', (req, res) => { res.status(404); });

module.exports = router;
