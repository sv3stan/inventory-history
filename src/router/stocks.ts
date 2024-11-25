import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { addStocks, incStocks } from '../controllers/stocks';

const stocksRouter = (pool: Pool) => {
  const router = express.Router();
  router.post('/', (req: Request, res: Response) => {
    addStocks(req, res, pool);
  });
  router.put('/inc', (req: Request, res: Response) => {
    incStocks(req, res, pool);
  });
  return router;
};

export default stocksRouter;
