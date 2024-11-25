import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

import initializeDatabase from '../utils/dbInit';
import rootRouter from './root';
import stocksRouter from './stocks';
import productRouter from './stocks';

dotenv.config();

const router = express.Router();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

initializeDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch((err: Error) =>
    console.error('Error during database initialization:', err)
  );

router.get('/', rootRouter);
router.use('/stocks', stocksRouter(pool));
router.use('/product', productRouter(pool));

export default router;
