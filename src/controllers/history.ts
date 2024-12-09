import { Request, Response } from 'express';
import { Pool } from 'pg';
import { RequestQuery, HistoryRow } from '../types/interfaces';
import { handleError } from '../utils/error';
import { buildQueryConditions } from '../services/history';

export const getHistory =
  (pool: Pool) => async (req: Request, res: Response) => {
    try {
      const {
        shop_id,
        plu,
        action,
        date_from,
        date_to,
        page = 1,
        limit = 10,
      } = req.query as RequestQuery;

      const parsedPage = parseInt(page as string, 10) || 1;
      const parsedLimit = parseInt(limit as string, 10) || 10;
      const offset = (parsedPage - 1) * parsedLimit;
      const { whereClause, params } = buildQueryConditions(req.query);

      const queryText = `
        SELECT *, COUNT(*) OVER () as total_count
        FROM history
        ${whereClause}
        ORDER BY timestamp ASC
        LIMIT $${params.length + 1} OFFSET $${params.length + 2};
      `;
      params.push(parsedLimit, offset);

      const result = await pool.query<HistoryRow>(queryText, params);
      const totalCount =
        result.rows.length > 0 ? result.rows[0].total_count : 0;

      res.json({
        total: totalCount,
        page: parsedPage,
        limit: parsedLimit,
        data: result.rows,
      });
    } catch (err) {
      handleError(res, err);
    }
  };
