import { Pool, Client } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';
import config from '../config';

const checkTablesExist = async (client: any): Promise<boolean> => {
  const tables = ['history'];
  let allTablesExist = true;
  //const client = await pool.connect();
  try {
    for (const table of tables) {
      const res = await client.query(
        `
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = $1
        `,
        [table]
      );
      if (res.rowCount === 0) {
        console.log(`Table ${table} does not exist.`);
        allTablesExist = false;
      } else {
        console.log(`Table ${table} exists.`);
      }
    }
  } catch (err) {
    console.error('Error checking tables:', err);
    throw err;
  }
  return allTablesExist;
};

export const createPool = (database: string): Pool => {
  return new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: database,
    password: config.DB_PASSWORD,
    port: parseInt(config.DB_PORT, 10),
  });
};
export const initializeDatabase = async (
  adminPool: Pool,
  userPool: Pool
): Promise<void> => {
  let admin;

  const createTablesSQL = readFileSync(
    path.join(__dirname, '../sql/create_table.sql'),
    'utf-8'
  );

  try {
    admin = await adminPool.connect();
    const res = await admin.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [config.DB_NAME]
    );
    if (res.rowCount) {
      console.log(`Database ${config.DB_NAME} already exists.`);
    } else {
      await admin.query(`CREATE DATABASE "${config.DB_NAME}";`);
      console.log(`Database ${config.DB_NAME} created successfully.`);
    }
    const client = await userPool.connect();

    const allTablesExist = await checkTablesExist(client);

    if (!allTablesExist) {
      console.log('Creating tables...');
      await client.query(createTablesSQL);
      console.log('Tables created successfully.');
    } else {
      console.log('All tables already exist.');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    if (admin) admin.release();
    await adminPool.end();
  }
};
