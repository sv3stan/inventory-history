import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { addStocks, incStocks, decStocks } from '../controllers/stocks';

const stocksRouter = (pool: Pool) => {
  const router = express.Router();
  router.post('/add_stocks', (req: Request, res: Response) => {
    addStocks(req, res, pool);
  });
  router.put('/inc_stocks', (req: Request, res: Response) => {
    incStocks(req, res, pool);
  });
  router.put('/dec_stocks', (req: Request, res: Response) => {
    decStocks(req, res, pool);
  });
  return router;
};

export default stocksRouter;
