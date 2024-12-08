import express, { Request, Response } from 'express';
import config from '../config';
import { Pool } from 'pg';
import rootRouter from './root';
import stocksRouter from './stocks';
import productRouter from './product';
import historyRouter from './history';

const router = express.Router();

const { createPool } = require('../utils/dbInit');

const userPool = createPool(config.DB_NAME);

router.get('/', rootRouter);
router.use('/stocks', stocksRouter(userPool));
router.use('/product', productRouter(userPool));
router.get('/history', historyRouter(userPool));

export default router;
