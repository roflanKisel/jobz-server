import Router from 'koa-router';
import AuthController from './controllers/authentication-controller';

const router = new Router({ prefix: '/auth' });

router
  .post('/signin', AuthController.signIn)
  .post('/signup', AuthController.signUp)
  .get('/private', AuthController.get);

export default router.routes();
