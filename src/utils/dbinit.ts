import { Pool } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const adminPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const createTablesSQL = readFileSync(
  path.join(__dirname, '../sql/create_table.sql'),
  'utf-8'
);
const initializeDatabase = async (): Promise<void> => {
  let admin;

  try {
    admin = await adminPool.connect();

    const res = await admin.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [process.env.DB_NAME]
    );

    if (res.rowCount) {
      console.log(`Database ${process.env.DB_NAME} already exists.`);
    } else {
      await admin.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
    }

    const userPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });

    const client = await userPool.connect();
    try {
      await client.query(createTablesSQL);
      console.log('Tables created successfully (if not exist).');
    } finally {
      client.release();
    }

    await userPool.end();
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    if (admin) admin.release();
    await adminPool.end();
  }
};

export default initializeDatabase;
