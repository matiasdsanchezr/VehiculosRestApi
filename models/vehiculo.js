const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'Nombre no puede estar vacio'],
    index: true,
  },
  marca: {
    type: String,
    required: [true, 'Marca no puede estar vacio'],
    index: true,
  },
  anio: {
    type: Number,
    required: [true, 'Anio no puede estar vacio'],
    index: true,
  },
  descripcion: {
    type: String,
    required: [true, 'Descripcion no puede estar vacio'],
  },
  vendido: {
    type: Boolean,
    default: false,
  },
},
{
  // Registrar fecha de creacion y actualizacion de los documentos
  timestamps: true,

  // No distinguir entre mayúsculas y minúsculas al realizar busquedas
  collation: {
    locale: 'es',
    strength: 2,
  },
});

const Vehiculo = model('Vehiculo', schema);

module.exports = Vehiculo;
