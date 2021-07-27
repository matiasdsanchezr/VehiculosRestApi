/**
 * Los errores de este modulo no deberian de ocurrir en situaciones normales e
 * indican situaciones no esperadas
 * */

/**
 * Registrar error si un documento ya esta almacenado en la base de datos
 * */
const documentoYaRegistrado = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 400;
  res.status(code).json({ errors: [`Ya existe un objeto con la misma propiedad: ${field}`] });
};

/**
 * Registrar error en la consola si se produce un error por un tipo de dato no valido
 * en un documento de mongoose
*/
const documentoInvalido = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const code = 400;

  if (errors.length > 1) {
    res.status(code).json({ errors });
  } else {
    res.status(code).json({ errors: [errors] });
  }
};

/**
 * Funcion para registrar un error en la api
 * */
module.exports = function errorHandler(err, req, res, next) {
  try {
    if (err.name === 'ValidationError') {
      documentoInvalido(err, res);
    }
    if (err.code && err.code === 11000) {
      documentoYaRegistrado(err, res);
    } else {
      res.status(400);
    }
  } catch (e) {
    res.status(400);
  }

  return next();
};
