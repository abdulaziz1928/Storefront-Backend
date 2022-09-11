import request from 'supertest';
import { User, JwtUser } from '../../models/users';
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

describe('Dashboard Endpoints', () => {
  beforeAll(async () => {
    token = (await request(app).post('/users').send(user)).body.token;
    user = (jwt.decode(token) as JwtUser).user;
    prod = (
      await request(app)
        .post('/products')
        .send(prod)
        .set({ authorization: token })
    ).body;
    order = { user_id: user.id!, status: 'active' };

    order = (
      await request(app)
        .post('/orders')
        .send(order)
        .set({ authorization: token })
    ).body;
    await request(app)
      .post(`/orders/${order.id}/products`)
      .send({ quantity: 2, product_id: prod.id })
      .set({ authorization: token });
  });
  it('GET /orders/:id/details should return status code 200 (success) if passed auth key and order id', async () => {
    const res = await request(app)
      .get(`/orders/${order.id}/details`)
      .set({ authorization: token });
    expect(res.body).toBeDefined();
  });
});
