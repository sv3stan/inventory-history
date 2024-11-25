import { Request, Response } from 'express';
import { Pool } from 'pg';

export const addProduct = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { plu, action } = req.body;
    const shop_id = 0;
    const quantity_on_shelf = 0;
    const quantity_in_order = 0;
    const balance_on_shelf = 0;
    const balance_in_order = 0;

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
    console.error('Error in addProduct:', err);
    res.status(500).send('Server Error');
  }
};
