import client from '../database';
export type OrderDetails = {
  user_id: string;
  products: [
    {
      product_id: string;
      quantity: number;
    }
  ];
  status: string;
};

export class DashboardQuaries {
  async showOrderDetails(user_id: string): Promise<OrderDetails> {
    const conn = await client.connect();
    const sql = `SELECT user_id,product_id,quantity,status FROM orders INNER JOIN order_products ON orders.user_id=${user_id} AND orders.status='active'`;
    const result = await conn.query(sql);
    conn.release();
    if (result.rows.length) {
      const f_row = result.rows[0];
      const res: OrderDetails = {
        user_id: f_row.user_id,
        products: [{ product_id: f_row.product_id, quantity: f_row.quantity }],
        status: f_row.status,
      };
      result.rows.shift();

      for (const row of result.rows)
        res.products.push({
          product_id: row.product_id,
          quantity: row.quantity,
        });

      return res;
    }
    throw new Error(`order doesnt exist `);
  }
}
