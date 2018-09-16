import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';

http.createServer(app.callback()).listen(config.env.PORT);
logger.log('info', `Server is running on port ${config.env.PORT}\n`);
