import { Orders, Order } from '../../models/orders';
import { ProductStore, Product } from '../../models/products';
import { Users, User } from '../../models/users';

const p_store = new ProductStore();
const us = new Users();
const ord = new Orders();
let order: Order;

let prod: Product = {
  name: 'po_test',
  category: 'test',
  price: 150,
};
let usr: User = {
  firstname: 'test',
  lastname: 'user',
  password: 'test12344321',
};
describe('Order Model', () => {
  beforeAll(async () => {
    usr = await us.create(usr);
    prod = await p_store.create(prod);
  });
  it('should have an index method', () => {
    expect(ord.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(ord.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(ord.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(ord.delete).toBeDefined();
  });
  it('should have a addProduct method', () => {
    expect(ord.addProduct).toBeDefined();
  });
  it('create method should add an order', async () => {
    const uid = usr.id!.toString();
    order = { user_id: uid!, status: 'active' };
    const res = await ord.create(order);
    expect({ user_id: res.user_id, status: res.status }).toEqual(order);
    order.id = res.id?.toString();
  });
  it('index method should should show all products', async () => {
    const res = await ord.index();
    expect(res.length).toBeGreaterThan(0);
  });
  it('show method should should show a product given an id', async () => {
    const res = await ord.show(order.id!);
    res.id = res.id?.toString();
    expect(res).toEqual(order);
  });
  it('addProduct should add a product to order', async () => {
    const pid = prod.id!.toString();
    const po = {
      quantity: 3,
      order_id: order.id!,
      product_id: pid,
    };
    const res = await ord.addProduct(3, po.order_id, po.product_id);
    expect({
      quantity: res.quantity,
      order_id: res.order_id,
      product_id: res.product_id,
    }).toEqual(po);
  });
  it('delete method should delete order given an id', async () => {
    const res = await ord.delete(order.id!);
    expect(res).not.toBeDefined();
  });
});
