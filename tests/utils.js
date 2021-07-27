const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config({ path: '.env' });

const testValues = require('./vehiculosTestValues');
const Server = require('../config/server');
const Vehiculo = require('../models/vehiculo');

// Instanciar un servidor express
const server = new Server();

// Parámetros de mongoose
const mongooseUri = process.env.MONGODB_URI_DEVELOPMENT;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  ignoreUndefined: true,
};

/** Inicializar mongoose y express */
exports.inicializarApp = async () => {
  server.listen();
  await mongoose
    .connect(mongooseUri, mongooseOptions)
    .catch((e) => {
      console.log('Error al conectar mongoose');
      console.error(e);
    });
};

/** @returns Instancia de express */
exports.getApp = () => server.app;

/** Finalizar express y la conexion a la base de datos */
exports.desconectarApp = async () => {
  server.disconnect();
  await mongoose.connection.close();
};

/** Limpiar la base de datos para comenzar un test */
exports.reiniciarDatabase = async () => {
  await Vehiculo.deleteMany({});
};

exports.agregarVehiculos = () => new Promise((resolve) => {
  const promises = [];
  testValues.vehiculosDePrueba.forEach(async (vehiculo) => {
    promises.push(Vehiculo.create(vehiculo));
  });
  Promise.all(promises).then(resolve());
});
