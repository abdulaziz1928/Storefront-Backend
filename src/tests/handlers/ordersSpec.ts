import request from 'supertest';
import { JwtUser, User } from '../../models/users';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/products';
import { Order } from '../../models/orders';
let token: string;
let user: User = {
  firstname: 'test',
  lastname: 'endpoint',
  password: 'test1234',
};
let prod: Product = {
  name: 'product',
  category: 'endpoint',
  price: 50,
};
let order: Order;

describe('Order Endpoints', () => {
  beforeAll(async () => {
    token = (await request(app).post('/users').send(user)).body.token;
    user = (jwt.decode(token) as JwtUser).user;
    console.log(user);
    prod = (
      await request(app)
        .post('/products')
        .send(prod)
        .set({ authorization: token })
    ).body;
    order = { user_id: user.id!, status: 'active' };
  });
  it('POST /orders should return status code 200 (success) if order can be created and auth token provided', async () => {
    const res = await request(app)
      .post('/orders')
      .send(order)
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
    order.id = res.body.id;
  });
  it('GET /orders should return status code 200 (success) and index all orders if auth token is provided', async () => {
    const res = await request(app).get('/orders').set({ authorization: token });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
  it('GET /orders/:id should return status code 200 (success) if passed auth token and order id ', async () => {
    const res = await request(app)
      .get(`/orders/${order.id}`)
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
  });
  it('POST /orders/:id/products should return status code 200 (success) if a product can be added to the order and auth token is provided', async () => {
    const body = { quantity: 2, product_id: prod.id };
    const res = await request(app)
      .post(`/orders/${order.id}/products`)
      .send(body)
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
  });
  it('DELETE /orders/:id should return status code 200 (success) if passed auth token and order id', async () => {
    const res = await request(app)
      .delete(`/orders/${order.id}`)
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
  });
});
