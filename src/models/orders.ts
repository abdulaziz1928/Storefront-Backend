import client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`cannot get orders: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot find order: ${err}`);
    }
  }
  async create(p: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *`;
      const res = await conn.query(sql, [p.status, p.user_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot insert order: ${err}`);
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      this.deleteOrderProduct(conn, id);
      const sql = `DELETE FROM orders WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot delete order: ${err}`);
    }
  }
  private async deleteOrderProduct(conn: any, id: string): Promise<void> {
    try {
      const sql = `DELETE FROM order_products WHERE order_id=${id}`;
      await conn.query(sql);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async addProduct(quantity: number, order_id: string, product_id: string) {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
      const res = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(
        `cannot add product ${product_id} to order ${order_id} with error: ${err}`
      );
    }
  }
}
