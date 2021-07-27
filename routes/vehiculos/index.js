const express = require('express');

const vehiculoController = require('../../controllers/vehiculoController');
const {
  validarVehiculoPost,
  validarVehiculoGetId,
  validarVehiculoPut,
  validarVehiculoGetQuery,
  validarVehiculoDelete,
  validarVehiculoPatch,
} = require('./validators');

const router = express.Router();

// Devolver todos los vehículos registrados
router.get('/', vehiculoController.getVehiculos);

// Devolver los vehiculos que coincidan con un query
router.get('/find', validarVehiculoGetQuery, vehiculoController.getVehiculosByQuery);

// Devolver los detalles de un vehiculos mediante un id
router.get('/:id', validarVehiculoGetId, vehiculoController.getVehiculoById);

// Registrar un nuevo vehiculo en la base de datos
router.post('/', validarVehiculoPost, vehiculoController.addVehiculo);

// Actualizar la información de un vehiculo usando el id
router.put('/', validarVehiculoPut, vehiculoController.putVehiculo);

// Actualizar parte de la información de un vehiculo utilizando el id
router.patch('/:id', validarVehiculoPatch, vehiculoController.patchVehiculo);

// Borrar un vehiculo utilizando un id
router.delete('/:id', validarVehiculoDelete, vehiculoController.deleteVehiculoById);

module.exports = router;
