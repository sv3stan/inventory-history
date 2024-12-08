import { RequestQuery } from '../types/interfaces';

export const buildQueryConditions = (query: RequestQuery) => {
  const conditions: string[] = [];
  const params: (number | string | Date)[] = [];

  if (query.shop_id) {
    conditions.push(`shop_id = $${params.length + 1}`);
    params.push(Number(query.shop_id));
  }
  if (query.plu) {
    conditions.push(`plu = $${params.length + 1}`);
    params.push(String(query.plu));
  }
  if (query.action) {
    conditions.push(`action = $${params.length + 1}`);
    params.push(String(query.action));
  }
  if (query.date_from) {
    conditions.push(`timestamp >= $${params.length + 1}`);
    params.push(new Date(query.date_from as string));
  }
  if (query.date_to) {
    conditions.push(`timestamp <= $${params.length + 1}`);
    params.push(new Date(query.date_to as string));
  }

  return {
    whereClause:
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
  };
};
