import Router from 'koa-router';
import VacancyController from './controllers/vacancy-controller';
import { findVacancy } from './handlers/vacancy-handler';

const router = new Router({ prefix: '/vacancies' });

router
  .get('/', VacancyController.getVacancies)
  .post('/', VacancyController.addVacancy)
  .param('id', findVacancy)
  .get('/:id', VacancyController.getVacancy)
  .put('/:id', VacancyController.updateVacancy)
  .delete('/:id', VacancyController.deleteVacancy);

export default router.routes();
