import Router from 'koa-router';
import auth from './authentication';
import company from './company';
import vacancy from './vacancy';
import user from './user';

const router = new Router({ prefix: '/api' });
router.use(auth);
router.use(company);
router.use(vacancy);
router.use(user);

export default router.routes();
