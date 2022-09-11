import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[0];
    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (err) {
    res.status(401).json(`Access denied, invalid token: ${err}`);
  }
};

export default verifyJWT;
