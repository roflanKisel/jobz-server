import Koa from 'koa';
import useHandlers from './handlers';
import logger from './utils/logger';

import routers from './modules';

const app = new Koa();

useHandlers(app);

app.use(routers);

app.use(async (ctx) => {
  await ctx.render('index.pug');
});

app.on('error', (err) => {
  logger.log('error', err);
});

export default app;
