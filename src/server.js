import http from 'http';
import Sequelize from 'sequelize';
import app from './app';
import config from './config';
import logger from './utils/logger';

const sequelize = new Sequelize('jobzdb', 'root', 'm8463854', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync()
  .then(() => {
    http.createServer(app.callback()).listen(config.env.PORT);
    logger.log('info', `Server is running on port ${config.env.PORT}\n`);
  })
  .catch((err) => {
    logger.log('error', err);
  });
