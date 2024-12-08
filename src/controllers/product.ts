import { Request, Response } from 'express';
import { Pool } from 'pg';
import { InsertResult } from '../types/interfaces';
import { handleError } from '../utils/error';
import { generateTimestamp, generateTimestampUniform } from '../utils/date';

export const addProduct = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { plu, action } = req.body;
    const shop_id = 0;
    const quantity_on_shelf = 0;
    const quantity_in_order = 0;
    const balance_on_shelf = 0;
    const balance_in_order = 0;
    //const timestamp = generateTimestamp(100, 5);
    //const timestamp = generateTimestampUniform(200, 10);
    const timestamp = new Date().toISOString();
    const queryParam = [
      plu,
      shop_id,
      action,
      quantity_on_shelf,
      quantity_in_order,
      quantity_on_shelf,
      quantity_in_order,
      timestamp,
    ];

    console.log(queryParam);
    const result: InsertResult = await pool.query(
      `INSERT INTO history 
   (plu, shop_id, action, quantity_on_shelf, quantity_in_order,balance_on_shelf, balance_in_order, timestamp) 
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
   RETURNING *`,
      queryParam
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};
