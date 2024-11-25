CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  plu VARCHAR(255) NOT NULL,
  shop_id INTEGER,
  action VARCHAR(255) NOT NULL CHECK (action IN ('add_product', 'add_stocks', 'inc_stocks','dec_stocks')),
  quantity_on_shelf INTEGER,
  quantity_in_order INTEGER,
  balance_on_shelf INTEGER,
  balance_in_order INTEGER,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );