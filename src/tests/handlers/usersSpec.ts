import request from 'supertest';
import { User } from '../../models/users';
import app from '../../server';
import jwt from 'jsonwebtoken';

let token: string;
const user: User = {
  firstname: 'test',
  lastname: 'endpoint',
  password: 'test1234',
};
describe('User Endpoints', () => {
  it('POST /users should return status code 200 (success) if user can be created and return auth token', async () => {
    const res = await request(app).post('/users').send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
  it('GET /users should return status code 200 (success) and index all users if user passes auth token', async () => {
    const res = await request(app).get('/users').set({ authorization: token });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
  it('GET /users/:id should return status code 200 (success) if user passes auth token and id', async () => {
    const res = await request(app)
      .get('/users/1')
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
  });
  it('GET /auth should return status code 200 (success) and auth token if user passes a correct id and password combination', async () => {
    const userD = jwt.decode(token) as User;
    const res = await request(app).get('/auth').send(userD);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
