import express, { Request, Response } from 'express';
import { Orders, Order } from '../models/orders';
import verifyJWT from '../middleware/jwt';
import dotenv from 'dotenv';
dotenv.config();

const ord = new Orders();

const index = async (req: Request, res: Response) => {
  const result = await ord.index();
  res.status(200).json(result);
};
const show = async (req: Request, res: Response) => {
  const result = await ord.show(req.params.id);
  res.status(200).json(result);
};
const destroy = async (req: Request, res: Response) => {
  const result = await ord.delete(req.params.id);
  res.status(200).json(result);
};
const create = async (req: Request, res: Response) => {
  const body = req.body;
  const product: Order = {
    status: body.status,
    user_id: body.user_id,
  };
  const result = await ord.create(product);
  res.status(200).json(result);
};
const addProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await ord.addProduct(
      body.quantity,
      req.params.id,
      body.product_id
    );
    res.status(200).json(result);
  } catch (err) {
    res.send('' + err);
  }
};

const order_routes = (app: express.Application) => {
  // get all orders
  app.get('/orders', verifyJWT, index);
  // get a specific order by passing the id
  app.get('/orders/:id', verifyJWT, show);
  // delete a specific order by passing the id
  app.delete('/orders/:id', verifyJWT, destroy);
  // create a new order
  app.post('/orders', verifyJWT, create);
  // add a product to an open order
  app.post('/orders/:id/products', verifyJWT, addProduct);
};
export default order_routes;
