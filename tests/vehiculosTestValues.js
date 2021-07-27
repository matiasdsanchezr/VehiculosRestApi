/** Arreglo de objetos Vehiculo */
exports.vehiculosDePrueba = [{
  _id: '60ff90cc094ac29747f3cf58',
  nombre: 'Camaro',
  marca: 'Chevrolet',
  anio: '2013',
  descripcion: 'El Chevrolet Camaro es un automóvil deportivo de dos puertas...',
}, {
  nombre: 'Mustang',
  marca: 'Ford',
  anio: '2021',
  descripcion: 'El Ford Mustang está animado por tres motores diferentes: un cuatro cilindros',
  vendido: 'true',
}, {
  nombre: 'Corvette C4',
  marca: 'Chevrolet',
  anio: '1991',
  descripcion: 'El Chevrolet Corvette es el deportivo americano por excelencia, y...',
  vendido: 1,
}];

/** Arreglo de objetos con datos inválidos */
exports.vehiculosErroneos = [
  // Nombre vació
  {
    nombre: '',
    marca: 'Chevrolet',
    anio: '2013',
    descripcion: 'El Chevrolet Camaro es un automóvil deportivo de dos puertas...',
  },
  // Marca vaciá
  {
    nombre: 'Mustang',
    marca: '',
    anio: '2021',
    descripcion: 'El Ford Mustang está animado por tres motores diferentes: un cuatro cilindros',
  },
  // Año vació
  {
    nombre: 'CorvetteC4',
    marca: 'Chevrolet',
    anio: '',
    descripcion: 'El Chevrolet Corvette es el deportivo americano por excelencia, y...',
  },
  // Descripción vaciá
  {
    nombre: 'Corvette C4',
    marca: 'Chevrolet',
    anio: '1991',
    descripcion: '',
  },
  // Año invalido
  {
    nombre: 'Corvette C4',
    marca: 'Chevrolet',
    anio: '2030',
    descripcion: 'El Chevrolet Corvette es el deportivo americano por excelencia, y...',
  },
  // Con campo faltaste
  {
    marca: 'Chevrolet',
    anio: '2030',
    descripcion: '',
  }];

/** Consultas query validas */
exports.queriesValidas = [
  'nombre=camaro',
  'marca=chevrolet',
  'anio=1991',
];

/** Consultas query invalidas */
exports.queriesInvalidas = [
  'id=21312312',
  'nombre=',
  'algo=78',
];
