import express, { Request, Response } from 'express';
import { Users, User } from '../models/users';
import verifyJWT from '../middleware/jwt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const us = new Users();

const index = async (req: Request, res: Response) => {
  const result = await us.index();
  res.status(200).json(result);
};
const show = async (req: Request, res: Response) => {
  try {
    const result = await us.show(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send('' + err);
  }
};
const create = async (req: Request, res: Response) => {
  const body = req.body;
  const usr: User = {
    firstname: body.firstname,
    lastname: body.lastname,
    password: body.password,
  };

  try {
    const result = await us.create(usr);
    const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET!);

    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).send('' + err);
  }
};
const login = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await us.auth(body.id, body.password);
    const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET!);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).send('' + err);
  }
};

const user_routes = (app: express.Application) => {
  // show all users
  app.get('/users', verifyJWT, index);
  // show user info given the id
  app.get('/users/:id', verifyJWT, show);
  // create user
  app.post('/users', create);
  // auth user
  app.get('/auth', login);
};
export default user_routes;
