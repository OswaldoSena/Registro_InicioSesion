import request from 'supertest';
import app from '../index'; // Importa tu aplicación Express (donde se definen tus rutas)

describe('Prueba de registro de usuario', () => {
  it('debería responder con un objeto {user, email, pass}', async () => {
    const response = await request(app)
    
      .post('/api/registro') // Reemplaza con la ruta real de registro
      .send({
        user: 'nuevoUsuario',
        email: 'nuevo@email.com',
        pass: 'contraseña123',
      });

    expect(response.status).toBe(201); // Verifica el estado de la respuesta
    
    
  });
});