export interface Config {
  URL: string;
  PORT: string;
  Remainder_URL: string;
  Remainder_PORT: string;
  DB_NAME_MAIN: string;
  DB_USER: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  PUBLIC_PATH: string;
  ServiceURL: string;
}

export interface StockData {
  plu: string;
  shop_id: string;
  action: string;
  quantity_on_shelf: number;
  quantity_in_order: number;
  balance_on_shelf: number;
  balance_in_order: number;
}

export interface RequestBody {
  plu: string;
  shop_id: string;
  action: string;
  quantity_on_shelf: number;
  quantity_in_order: number;
}

export interface InsertResult {
  rows: {
    id: number;
    plu: string;
    shop_id: string;
    action: string;
    quantity_on_shelf: number;
    quantity_in_order: number;
    balance_on_shelf: number;
    balance_in_order: number;
    timestamp: string;
  }[];
}

export interface RequestQuery {
  shop_id?: string;
  plu?: string;
  action?: string;
  date_from?: string;
  date_to?: string;
  page?: string;
  limit?: string;
}

export interface HistoryRow {
  shop_id: number;
  plu: string;
  action: string;
  stocks_on_shelf: number;
  stocks_in_order: number;
  total_on_shelf: number;
  total_in_order: number;
  total_count: number;
  timestamp: Date;
}
