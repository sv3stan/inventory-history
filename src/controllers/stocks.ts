import { Request, Response } from 'express';
import { Pool } from 'pg';

export const addStocks = async (req: Request, res: Response, pool: Pool) => {
  try {
    const {
      plu,
      shop_id,
      action,
      quantity_on_shelf,
      quantity_in_order,
      balance_on_shelf,
      balance_in_order,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO history 
   (plu, shop_id, action, quantity_on_shelf, quantity_in_order,balance_on_shelf, balance_in_order, timestamp) 
   VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
   RETURNING *`,
      [
        plu,
        shop_id,
        action,
        quantity_on_shelf,
        quantity_in_order,
        quantity_on_shelf,
        quantity_in_order,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in addActions:', err);
    res.status(500).send('Server Error');
  }
};

export const incStocks = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { plu, shop_id, action, quantity_on_shelf, quantity_in_order } =
      req.body;
    const existingStock = await pool.query(
      `SELECT 
        SUM(quantity_on_shelf) AS total_quantity_on_shelf, 
        SUM(quantity_in_order) AS total_quantity_in_order 
        FROM history 
        WHERE plu = $1 AND shop_id = $2`,
      [plu, shop_id]
    );

    console.log(existingStock);
    const { total_quantity_on_shelf = 0, total_quantity_in_order = 0 } =
      existingStock.rows[0];
    console.log(total_quantity_in_order);
    console.log(total_quantity_on_shelf);
    const balance_on_shelf = total_quantity_on_shelf + quantity_on_shelf;
    const balance_in_order = total_quantity_in_order + quantity_in_order;

    const result = await pool.query(
      `INSERT INTO history 
       (plu, shop_id, action, quantity_on_shelf, quantity_in_order, balance_on_shelf, balance_in_order, timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
       RETURNING *`,
      [
        plu,
        shop_id,
        action,
        quantity_on_shelf,
        quantity_in_order,
        balance_on_shelf,
        balance_in_order,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in incStocks:', err);
    res.status(500).send('Server Error');
  }
};
