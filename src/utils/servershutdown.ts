import { Server } from 'http';
import { Pool } from 'pg';

export const serverShutdown = (server: Server, userPool: Pool): void => {
  const handleExit = async (signal: NodeJS.Signals): Promise<void> => {
    console.log(`Received ${signal}. Closing resources...`);
    try {
      await userPool.end();
      console.log('User pool closed.');
      server.close(() => {
        console.log('Server closed.');
      });
    } catch (err: any) {
      console.error('Error during shutdown:', err);
    }
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
};
