import client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`cannot get products: ${err}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot find product: ${err}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *`;
      const res = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot insert product: ${err}`);
    }
  }
}
