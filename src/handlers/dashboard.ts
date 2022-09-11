import express, { Request, Response } from 'express';
import verifyJWT from '../middleware/jwt';
import dotenv from 'dotenv';
import { DashboardQuaries } from '../services/dashboard';
dotenv.config();

const ds = new DashboardQuaries();

const showOrderDetails = async (req: Request, res: Response) => {
  try {
    const result = await ds.showOrderDetails(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.send('' + err);
  }
};
const dashboard_routes = (app: express.Application) => {
  app.get('/orders/:id/details', verifyJWT, showOrderDetails);
};
export default dashboard_routes;
