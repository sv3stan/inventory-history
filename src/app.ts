import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import router from './router/index';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());

app.use(express.json());

app.use('/', router);
//app.use('/history', router);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`History service listening on port ${port}`);
});
