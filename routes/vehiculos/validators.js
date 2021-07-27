const { check, validationResult } = require('express-validator');

const Vehiculo = require('../../models/vehiculo');

const anioActual = new Date().getFullYear();

/** Registrar y devolver los errores */
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = errors.array().map((e) => e.msg);
    return res.status(400).json({ errors: response });
  }
  return next();
};

/** Verificar si el id esta registrado en la base de datos */
const validarIdRegistrado = (value) => Vehiculo.findById(value).then((vehiculo) => {
  if (!vehiculo) {
    return Promise.reject(
      new Error('No se registra un vehiculo con ese id'),
    );
  }
  return true;
});

/** Validar todos los datos de un vehiculo */
module.exports.validarVehiculoPost = [
  check('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacio')
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('El nombre solo puede contener caracteres alfanumericos'),
  check('marca')
    .trim()
    .notEmpty()
    .withMessage('La marca del vehiculo no puede estar vacia')
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('La marca solo puede contener caracteres alfanumericos'),
  check('anio')
    .trim()
    .notEmpty()
    .withMessage('El año de fabricacion del vehiculo no puede estar vacio')
    .isInt({ min: 1886, max: anioActual })
    .withMessage('El año es invalido'),
  check('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripcion del vehiculo no puede estar vacia'),
  check('vendido')
    .optional()
    .trim()
    .toBoolean(true),
  validarCampos,
];

/** Validar un id de mongodb */
module.exports.validarVehiculoGetId = [
  check('id', 'El id es invalido').isMongoId(),
  validarCampos,
];

/** Validar si un id esta registrado en la base de datos */
module.exports.validarVehiculoPut = [
  check('id', 'El id es invalido')
    .isMongoId()
    .bail()
    .custom(validarIdRegistrado),
  this.validarVehiculoPost,
];

module.exports.validarVehiculoPatch = [
  check('id', 'El id es invalido')
    .isMongoId()
    .bail()
    .custom(validarIdRegistrado),
  check('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacio')
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('El nombre solo puede contener caracteres alfanumericos'),
  check('marca')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La marca del vehiculo no puede estar vacia')
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('La marca solo puede contener caracteres alfanumericos'),
  check('anio')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El año de fabricacion del vehiculo no puede estar vacio')
    .isInt({ min: 1886, max: anioActual })
    .withMessage('El año es invalido'),
  check('descripcion')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La descripcion del vehiculo no puede estar vacia'),
  check('vendido')
    .optional()
    .trim()
    .toBoolean(true),
  validarCampos,
];

/** Validar query de parametros opcionales */
module.exports.validarVehiculoGetQuery = [
  check('nombre')
    .optional()
    .trim()
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('El nombre solo puede contener caracteres alfanumericos'),
  check('marca')
    .optional()
    .trim()
    .isAlphanumeric('es-ES', { ignore: ' .-&' })
    .withMessage('La marca solo puede contener caracteres alfanumericos'),
  check('anio')
    .optional()
    .trim()
    .isInt()
    .withMessage('El año debe ser de tipo numerico'),
  validarCampos,
];

module.exports.validarVehiculoDelete = [
  check('id', 'El id es invalido')
    .isMongoId()
    .bail()
    .custom(validarIdRegistrado),
  validarCampos,
];
