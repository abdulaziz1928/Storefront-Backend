import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};
export type JwtUser = {
  user: User;
  iat: number;
};

export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`cannot get users: ${err}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot find user: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users (firstName,lastName,password) VALUES ($1,$2,$3) RETURNING *`;
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(salt!));
      const res = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`cannot create user ${err}`);
    }
  }
  async auth(id: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = `SELECT password FROM users WHERE id=($1)`;
    const result = await conn.query(sql, [id]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
