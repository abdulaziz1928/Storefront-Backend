import request from 'supertest';
import { User } from '../../models/users';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/products';
let token: string;
const user: User = {
  firstname: 'test',
  lastname: 'endpoint',
  password: 'test1234',
};
let prod: Product = {
  name: 'product',
  category: 'endpoint',
  price: 50,
};
describe('Product Endpoints', () => {
  beforeAll(async () => {
    token = (await request(app).post('/users').send(user)).body.token;
  });
  it('POST /products should return status code 200 (success) if product can be created and auth token provided', async () => {
    const res = await request(app)
      .post('/products')
      .send(prod)
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
    prod = res.body as Product;
  });
  it('GET /products should return status code 200 (success)', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });
  it('GET /products/:id should return status code 200 (success) if passed an existing product id', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
  });
});
