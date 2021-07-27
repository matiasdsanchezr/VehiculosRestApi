const { matchedData } = require('express-validator');

const Vehiculo = require('../models/vehiculo');

/** Obtener una los ultimos 20 vehiculos registrados */
exports.getVehiculos = async (req, res) => {
  // const vehiculos = await Vehiculo.find().sort({ _id: -1 }).limit(10);
  const vehiculos = await Vehiculo.find();

  return Object.keys(vehiculos).length
    ? res.json({ vehiculos })
    : res.status(404).json({ errors: ['La base de datos esta vacía.'] });
};

/** Agregar un nuevo vehiculo a la base de datos */
exports.addVehiculo = async (req, res, next) => {
  const vehiculo = matchedData(req, {
    locations: ['body'],
    includeOptionals: true,
  });

  const nuevoVehiculo = new Vehiculo(vehiculo);

  await nuevoVehiculo.save()
    .then(() => res.json({
      message: 'Vehiculo registrado',
      vehiculo: nuevoVehiculo,
    }))
    .catch((error) => { next(error); });
};

/** Obtener un vehiculo utilizando un id único */
module.exports.getVehiculoById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vehiculo = await Vehiculo.findById(id);

    return vehiculo
      ? res.json(vehiculo)
      : res.status(404).json({ errors: ['No se encontró un vehiculo con ese id'] });
  } catch (error) { return next(error); }
};

/** Obtener un vehiculo por parámetros opcionales */
module.exports.getVehiculosByQuery = async (req, res, next) => {
  const query = matchedData(req, {
    locations: ['query'],
    includeOptionals: false,
  });

  if (!Object.keys(query).length) {
    return res.status(400).json({ errors: ['Parámetros inválidos'] });
  }

  try {
    const vehiculos = await Vehiculo.find(query)
      .catch(() => ('Error al leer la base de datos'));

    return Object.keys(vehiculos).length
      ? res.json(vehiculos)
      : res.status(404).json({
        errors: ['No se encontraron vehiculos'],
      });
  } catch (error) { return next(error); }
};

/** Actualizar todos los datos de un vehiculo */
exports.putVehiculo = async (req, res, next) => {
  const datosValidados = matchedData(req, {
    locations: ['body'],
    includeOptionals: true,
  });

  const { id, ...datosNuevos } = datosValidados;

  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate({ _id: id }, datosNuevos, { new: true });

    return vehiculo
      ? res.json({ vehiculo })
      : res.status(404).json({ errors: ['No se encontró un vehiculo con ese id'] });
  } catch (error) { return next(error); }
};

/** Actualizar datos del vehiculo */
exports.patchVehiculo = async (req, res, next) => {
  const { id } = req.params;
  const datosNuevos = matchedData(req, {
    locations: ['body'],
    includeOptionals: false,
  });

  // Verificar si hay datos para actualizar
  if (Object.keys(datosNuevos).length === 0) {
    return res.json({ message: 'No hay datos que actualizar' });
  }

  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate({ _id: id }, datosNuevos, { new: true });

    return vehiculo
      ? res.json({ message: 'Vehiculo actualizado', vehiculo })
      : res.status(404).json({ errors: ['No se encontró un vehiculo con ese id'] });
  } catch (error) { return next(error); }
};

/** Eliminar un vehiculo utilizando un ID */
exports.deleteVehiculoById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vehiculo = await Vehiculo.findOneAndDelete({ _id: id });

    return vehiculo
      ? res.json({ message: 'Vehiculo eliminado', vehiculo })
      : res.status(404).json({ errors: ['No se encontró un vehiculo con ese id'] });
  } catch (error) { return next(error); }
};
