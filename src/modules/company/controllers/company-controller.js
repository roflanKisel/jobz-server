import logger from '../../../utils/logger';
import { Company } from '../../../models';
import CompanyService from '../services/company-service';

const getCompanies = async (ctx) => {
  try {
    logger.log('debug', 'in getCompanies');
    ctx.body = await Company.findAll();
  } catch (err) {
    logger.log('error', 'error in getCompanies');
  }
};

const addCompany = async (ctx) => {
  try {
    logger.log('debug', 'creating company');
    ctx.body = await CompanyService.createCompany(ctx.request.body);
  } catch (err) {
    logger.log('error', 'add company error');
  }
};

const updateCompany = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);

  try {
    ctx.body = await CompanyService.updateCompany(ctx.company, ctx.request.body);
  } catch (err) {
    ctx.status = 500;
  }
};

const deleteCompany = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);

  try {
    ctx.body = await CompanyService.deleteCompany(ctx.company);
  } catch (err) {
    ctx.status = 500;
  }
};

export default {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
};
