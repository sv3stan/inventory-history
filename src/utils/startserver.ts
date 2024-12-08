import express from 'express';
import cors from 'cors';
import path from 'path';
import config from '../config';
import router from '../router/index';
import createApp from './appcreate';
import { serverShutdown } from './servershutdown';
import { initializeDatabase, createPool } from './dbInit';

const startServer = async (): Promise<void> => {
  const adminPool = createPool(config.DB_NAME_MAIN);
  const userPool = createPool(config.DB_NAME);

  try {
    await initializeDatabase(adminPool, userPool);
    console.log('Database initialized successfully');

    const app = createApp();

    const server = app.listen(config.PORT, () => {
      console.log(`Server running on http://${config.URL}:${config.PORT}`);
    });

    serverShutdown(server, userPool);
  } catch (error) {
    console.error('Error starting server:', error);
    throw error;
  }
};

export default startServer;
