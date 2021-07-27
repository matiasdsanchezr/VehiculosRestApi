const supertest = require('supertest');

const testValues = require('./vehiculosTestValues');

const utils = require('./utils');

const { vehiculosDePrueba } = testValues;
const { vehiculosErroneos } = testValues;

let api;

async function init() {
  await utils.inicializarApp();
  api = supertest(utils.getApp());
}

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await utils.desconectarApp();
});

describe('GET /vehiculos', () => {
  beforeAll(async () => {
    await utils.reiniciarDatabase();
    await utils.agregarVehiculos();
  });

  test('Obtener todos los vehiculos en la base de datos', async () => {
    const res = await api.get('/vehiculos').expect(200);
    expect(res.body.vehiculos.length).toBe(3);
  });
});

describe('GET /vehiculos/:id', () => {
  beforeAll(async () => {
    await utils.reiniciarDatabase();
    await utils.agregarVehiculos();
  });

  test('Buscar un vehiculo con un id invalido', async () => {
    const res = await api.get('/vehiculos/idinvalido123').expect(400);
    expect(res.body.errors).not.toBe(null);
  });

  test('Buscar un vehiculo con un id valido no registrado', async () => {
    const res = await api.get('/vehiculos/60fa9b95644ff830a2e21c75').expect(404);
    expect(res.body.errors).not.toBe(null);
  });

  test('Buscar un vehiculo con un id valido registrado', async () => {
    const res = await api.get('/vehiculos/60ff90cc094ac29747f3cf58').expect(200);
    expect(res.body.vehiculo).not.toBe(null);
  });
});

describe('GET /vehiculos?find', () => {
  const { queriesValidas } = testValues;

  test.each(queriesValidas)('Buscar vehiculo con parámetros query validos', async (query) => {
    const res = await api.get(`/vehiculos/find?${query}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body.vehiculos).not.toBe(null);
  });

  test('Buscar vehiculo con parámetros query validos sin coincidencias', async () => {
    await api.get('/vehiculos/find?$nombre=asdasd&marca=asdasd')
      .expect(404)
      .expect('Content-Type', /application\/json/);
  });

  const { queriesInvalidas } = testValues;
  test.each(queriesInvalidas)('Buscar vehiculo con parámetros query inválidos', async (query) => {
    await api.get(`/vehiculos/find?${query}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('POST /vehiculos', () => {
  beforeAll(async () => {
    await utils.reiniciarDatabase();
    await utils.agregarVehiculos();
  });

  test.each(vehiculosDePrueba)('Agregar un nuevo vehículo a la base de datos', async (vehiculo) => {
    const response = await api.post('/vehiculos')
      .send(vehiculo)
      .expect(200);
    expect(response.body.vehiculo.nombre).not.toBe(null);
  });

  test.each(vehiculosErroneos)('Registrar vehículo con datos inválidos', async (vehiculo) => {
    const response = await api.post('/vehiculos')
      .send(vehiculo)
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });
});

describe('PUT /vehiculos', () => {
  test.each(vehiculosErroneos)('Modificar vehiculo con datos inválidos', async (vehiculo) => {
    const nuevosDatos = vehiculo;
    nuevosDatos.id = '60ff90cc094ac29747f3cf58';

    const response = await api.put('/vehiculos')
      .send(nuevosDatos)
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Modificar vehiculo con id no registrado', async () => {
    const nuevosDatos = vehiculosDePrueba[1];
    nuevosDatos.id = '60ff90cc094ac29747f3cf55';

    const response = await api.put('/vehiculos')
      .send(nuevosDatos)
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Modificar vehiculo con id invalido', async () => {
    const nuevosDatos = vehiculosDePrueba[1];
    nuevosDatos.id = 'asdasdasasd';

    const response = await api.put('/vehiculos')
      .send(nuevosDatos)
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Modificar vehiculo con datos validos', async () => {
    const nuevosDatos = vehiculosDePrueba[1];
    nuevosDatos.id = '60ff90cc094ac29747f3cf58';

    const response = await api.put('/vehiculos')
      .send(nuevosDatos)
      .expect(200);
    expect(response.body.vehiculo).not.toBe(null);
  });
});

describe('PATCH /vehiculos', () => {
  test.each(vehiculosErroneos)('Modificar vehiculo con datos inválidos', async (vehiculo) => {
    const response = await api.patch('/vehiculos/60ff90cc094ac29747f3cf58')
      .send(vehiculo)
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Modificar vehiculo con id no registrada', async () => {
    const response = await api.patch('/vehiculos/60ff90cc094ac29747f3cccc')
      .send({ nombre: 'Clio' })
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Modificar nombre', async () => {
    const response = await api.patch('/vehiculos/60ff90cc094ac29747f3cf58')
      .send({ nombre: 'Clio' })
      .expect(200);
    expect(response.body.vehiculo.nombre).toBe('Clio');
  });

  test('Modificar marca', async () => {
    const response = await api.patch('/vehiculos/60ff90cc094ac29747f3cf58')
      .send({ marca: 'Renault' })
      .expect(200);
    expect(response.body.vehiculo.marca).toBe('Renault');
  });

  test('Modificar descripción', async () => {
    const response = await api.patch('/vehiculos/60ff90cc094ac29747f3cf58')
      .send({ descripcion: 'Nueva descripción' })
      .expect(200);
    expect(response.body.vehiculo.descripcion).toBe('Nueva descripción');
  });
});

describe('DELETE /vehiculos/:id', () => {
  test('Eliminar vehiculo con id invalida', async () => {
    const response = await api.delete('/vehiculos/6asdasdasd')
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Eliminar vehiculo con id no registrada', async () => {
    const response = await api.delete('/vehiculos/60ff90cc094ac29747f3cccc')
      .expect(400);
    expect(response.body.errors).not.toBe(null);
  });

  test('Eliminar vehiculo con id registrada', async () => {
    const response = await api.delete('/vehiculos/60ff90cc094ac29747f3cf58')
      .expect(200);
    expect(response.body.vehiculo).not.toBe(null);
  });
});
