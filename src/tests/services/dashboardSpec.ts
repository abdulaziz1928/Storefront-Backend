import { Orders, Order } from '../../models/orders';
import { ProductStore, Product } from '../../models/products';
import { Users, User } from '../../models/users';
import { DashboardQuaries, OrderDetails } from '../../services/dashboard';

const dq = new DashboardQuaries();
const p_store = new ProductStore();
const us = new Users();
const ord = new Orders();
let order: Order;
let prod: Product = {
  name: 'dq_test',
  category: 'test',
  price: 10,
};
let usr: User = {
  firstname: 'test',
  lastname: 'user',
  password: 'test12344321',
};
describe('Dashboard Service', () => {
  beforeAll(async () => {
    usr = await us.create(usr);
    prod = await p_store.create(prod);
    order = await ord.create({ user_id: usr.id!, status: 'active' });
    const m = await ord.addProduct(3, order.id!, prod.id!);
  });
  it('should have a show order details method', () => {
    expect(dq.showOrderDetails).toBeDefined();
  });
  it('show order details method should return order details', async () => {
    const res = await dq.showOrderDetails(usr.id!);
    expect(res).toBeDefined();
  });
});
