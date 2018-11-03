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
};

const deleteCompany = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);
};

export default {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
};
