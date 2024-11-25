import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { addProduct } from '../controllers/product';

const productRouter = (pool: Pool) => {
  const router = express.Router();
  router.post('/', (req: Request, res: Response) => {
    addProduct(req, res, pool);
  });
  return router;
};

export default productRouter;
