import Router from 'koa-router';
import UserController from './controllers/user-controller';
import { findUser } from './handlers/user-handler';

const router = new Router({ prefix: '/users' });

router
  .get('/', UserController.getUsers)
  .param('id', findUser)
  .get('/:id/companies', UserController.getUserCompanies)
  .get(':id/vacancies', UserController.getUserVacancies)
  .put('/:id', UserController.updateUser)
  .delete('/:id', UserController.deleteUser);

export default router.routes();
