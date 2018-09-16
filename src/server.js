import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';
import sequelize from './helpers/database';

sequelize.sync()
  .then(() => {
    http.createServer(app.callback()).listen(config.env.PORT);
    logger.log('info', `Server is running on port ${config.env.PORT}\n`);
  })
  .catch((err) => {
    logger.log('error', err);
  });
