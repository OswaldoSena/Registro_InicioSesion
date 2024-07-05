// Ejemplo de prueba con Jest y Supertest
const request = require('supertest');
const app = require('./tu_app'); // Importa tu aplicación Express

describe('Pruebas de controladores', () => {
  it('Debería responder con estado 200 en la ruta /api/usuarios', async () => {
    const response = await request(app).get('/api/usuarios');
    expect(response.status).toBe(200);
  });
})