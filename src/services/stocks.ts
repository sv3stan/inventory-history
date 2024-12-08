import { Pool } from 'pg';
import { StockData, InsertResult } from '../types/interfaces';
import {
  generateTimestamp,
  lastGeneratedDate,
  generateTimestampUniform,
} from '../utils/date';
export const getBalanceStock = async (
  plu: string,
  shop_id: string,
  pool: Pool
) => {
  try {
    const result: InsertResult = await pool.query(
      `SELECT balance_on_shelf, balance_in_order
       FROM history 
       WHERE plu = $1 AND shop_id = $2
       ORDER BY timestamp DESC
       LIMIT 1`,
      [plu, shop_id]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error('Error in getLastStock:', err);
    throw new Error('Database query error');
  }
};

export const insertHistory = async (
  pool: Pool,
  data: StockData,
  timestamp?: string
  //timestamp?: string
) => {
  // делал для массового занесения данных со случайным увеличением даты
  //const timestamp = generateTimestamp(85, 3);
  //const timestamp = generateTimestampUniform(30, 10);
  const {
    plu,
    shop_id,
    action,
    quantity_on_shelf,
    quantity_in_order,
    balance_on_shelf,
    balance_in_order,
  } = data;

  const queryParams = [
    plu,
    shop_id,
    action,
    quantity_on_shelf,
    quantity_in_order,
    balance_on_shelf,
    balance_in_order,
    // timestamp,
    timestamp || new Date().toISOString(),
  ];

  console.log('Query parameters:', queryParams);

  return pool.query(
    `INSERT INTO history 
     (plu, shop_id, action, quantity_on_shelf, quantity_in_order, balance_on_shelf, balance_in_order, timestamp) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    queryParams
  );

  // первый неудачный вариант увеличения даты в случайном порядке
  //lastGenerateDate = new Date(timestamp);
};
