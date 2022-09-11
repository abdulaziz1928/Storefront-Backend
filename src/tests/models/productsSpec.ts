import { ProductStore, Product } from '../../models/products';

const store = new ProductStore();
const prod: Product = {
  name: 'product_test',
  category: 'test',
  price: 100,
};
describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('create method should add a product', async () => {
    const res = await store.create(prod);
    expect({
      name: res.name,
      price: res.price,
      category: res.category,
    }).toEqual(prod);
    prod.id = res.id;
  });
  it('show method should should show a product given an id', async () => {
    const res = await store.show(prod.id!);
    expect(res).toEqual(prod);
  });
  it('index method should should show all products', async () => {
    const res = await store.index();
    expect(res.length).toBeGreaterThan(0);
  });
});
