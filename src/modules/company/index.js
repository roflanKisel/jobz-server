import Router from 'koa-router';
import CompanyController from './controllers/company-controller';
import { findCompany } from './handlers/company-handler';

const router = new Router({ prefix: '/companies' });

router
  .get('/', CompanyController.getCompanies)
  .post('/', CompanyController.addCompany)
  .param('id', findCompany)
  .put('/:id', CompanyController.updateCompany)
  .delete('/:id', CompanyController.deleteCompany);

export default router.routes();
