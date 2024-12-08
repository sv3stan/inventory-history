import startServer from './utils/startserver';

startServer()
  .then(() => {
    console.log('Server started successfully');
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
