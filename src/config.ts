const dotenv = require('dotenv');
import { Config } from './types/interfaces';
import path from 'path';
dotenv.config();

const config: Config = {
  URL: process.env.URL || 'localhost',
  PORT: process.env.PORT || '3002',
  Remainder_URL: process.env.REMAINDER_URL || 'localhost',
  Remainder_PORT: process.env.REMAINDER_PORT || '3002',
  DB_NAME_MAIN: process.env.DB_NAME_MAIN || 'postgres',
  DB_USER: process.env.DB_USER || 'history',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'history',
  DB_PASSWORD: process.env.DB_PASSWORD || 'pass',
  DB_PORT: process.env.DB_PORT || '5432',
  PUBLIC_PATH: process.env.PUBLIC_PATH || path.join(__dirname, '../../public'),
  ServiceURL: `http://${process.env.URL || 'localhost'}:${
    process.env.PORT || '3002'
  }`,
};

export default config;
