import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/products';
import dotenv from 'dotenv';
import verifyJWT from '../middleware/jwt';

dotenv.config();

const pd = new ProductStore();

const index = async (req: Request, res: Response) => {
  const result = await pd.index();
  res.status(200).json(result);
};

const show = async (req: Request, res: Response) => {
  const result = await pd.show(req.params.id);
  res.status(200).json(result);
};
const create = async (req: Request, res: Response) => {
  const body = req.body;
  const product: Product = {
    name: body.name,
    price: body.price,
    category: body.category,
  };
  const result = await pd.create(product);
  res.status(200).json(result);
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyJWT, create);
  //   add top 5 , and products by category (no tokens all)
};
export default product_routes;
