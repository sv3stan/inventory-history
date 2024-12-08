import express from 'express';
import cors from 'cors';
import path from 'path';
import router from '../router';
import config from '../config';

const createApp = () => {
  const app = express();
  const corsOptions = {
    origin: [`http://${config.URL}:${config.PORT}`],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static(config.PUBLIC_PATH));
  app.use(router);
  return app;
};

export default createApp;
