import { Request, Response } from 'express';
import { Pool } from 'pg';
import { StockData, RequestBody, InsertResult } from '../types/interfaces';
import { insertHistory, getBalanceStock } from '../services/stocks';
import { validateRequest } from '../utils/validate';
import { handleError } from '../utils/error';
import { getRandomTimestamp } from '../utils/date';

export const addStocks = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  pool: Pool
) => {
  try {
    const { plu, shop_id, action, quantity_on_shelf, quantity_in_order } =
      req.body;

    const validation = validateRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    const balance_in_order = quantity_in_order;
    const balance_on_shelf = quantity_on_shelf;

    const stockData: StockData = {
      plu,
      shop_id,
      action,
      quantity_on_shelf,
      quantity_in_order,
      balance_on_shelf: quantity_on_shelf,
      balance_in_order: quantity_in_order,
    };

    const result: InsertResult = await insertHistory(
      pool,
      stockData
      //getRandomTimestamp(60)
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

export const incStocks = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  pool: Pool
) => {
  try {
    const { plu, shop_id, action, quantity_on_shelf, quantity_in_order } =
      req.body;

    const validation = validateRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    const existingStock = await getBalanceStock(plu, shop_id, pool);
    if (!existingStock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    const { balance_on_shelf, balance_in_order } = existingStock;
    const balance_on_shelf_number = +balance_on_shelf;
    const balance_in_order_number = +balance_in_order;
    const new_balance_on_shelf = balance_on_shelf_number + quantity_on_shelf;
    const new_balance_in_order = balance_in_order_number + quantity_in_order;

    const stockData: StockData = {
      plu,
      shop_id,
      action,
      quantity_on_shelf,
      quantity_in_order,
      balance_on_shelf: new_balance_on_shelf,
      balance_in_order: new_balance_in_order,
    };

    const result: InsertResult = await insertHistory(
      pool,
      stockData
      // getRandomTimestamp(60)
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

export const decStocks = async (
  req: Request<{}, {}, RequestBody>,
  res: Response,
  pool: Pool
) => {
  try {
    const { plu, shop_id, action, quantity_on_shelf, quantity_in_order } =
      req.body;

    const validation = validateRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    const existingStock = await getBalanceStock(plu, shop_id, pool);
    console.log(plu);
    console.log(shop_id);
    if (!existingStock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    console.log(existingStock);

    const { balance_on_shelf, balance_in_order } = existingStock;
    const balance_on_shelf_number = +balance_on_shelf;
    const balance_in_order_number = +balance_in_order;

    const new_balance_on_shelf = balance_on_shelf_number - quantity_on_shelf;
    const new_balance_in_order = balance_in_order_number - quantity_in_order;

    const stockData: StockData = {
      plu,
      shop_id,
      action,
      quantity_on_shelf,
      quantity_in_order,
      balance_on_shelf: new_balance_on_shelf,
      balance_in_order: new_balance_in_order,
    };

    const result: InsertResult = await insertHistory(
      pool,
      stockData
      //  getRandomTimestamp(60)
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};
