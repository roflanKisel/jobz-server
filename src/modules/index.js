import Router from 'koa-router';
import auth from './authentication';

const router = new Router({ prefix: '/api' });
router.use(auth);

export default router.routes();
