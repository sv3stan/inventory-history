// import express, { Request, Response } from 'express';
import express from 'express';
import { Pool } from 'pg';
import { getHistory } from '../controllers/history';

const historyRouter = (pool: Pool) => {
  const router = express.Router();

  router.get('/history', getHistory(pool));

  return router;
};

export default historyRouter;

// import express from 'express';
