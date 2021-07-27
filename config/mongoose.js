// Cargar base de datos
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  ignoreUndefined: true,
};

// Iniciar conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI_RELEASE, options)
  .catch((e) => {
    console.log('Error al conectar mongoose');
    console.error(e);
  });

// Eventos:
// Conexion exitosa
mongoose.connection.on('connected', () => {
  console.log('Conexion por defecto de mongoose iniciada');
});

// Error de conexion
mongoose.connection.on('error', (err) => {
  console.error(`Error al iniciar la conexion por defecto de mongoose: ${err}`);
});

// Conexion terminada
mongoose.connection.on('disconnected', () => {
  console.warn('Conexion por defecto de mongoose terminada');
});

// Aplicacion finalizada
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.warn('Se cerro la conexion por defecto de mongoose debido al cierra de la aplicacion');
    process.exit(0);
  });
});

module.exports = mongoose;
