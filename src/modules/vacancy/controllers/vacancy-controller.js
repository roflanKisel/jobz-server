import logger from '../../../utils/logger';
import { Vacancy, Company } from '../../../models';
import VacancyService from '../services/vacancy-service';

const getVacancies = async (ctx) => {
  try {
    logger.log('debug', 'in getVacancies');
    ctx.body = await Vacancy.findAll({
      include: [{
        model: Company,
      }],
    });
  } catch (err) {
    logger.log('error', 'error in getVacancies');
    logger.log('error', err);
  }
};

const getVacancy = async (ctx) => {
  logger.log('debug', 'get one vacancy');
  ctx.body = ctx.vacancy;
};

const addVacancy = async (ctx) => {
  try {
    logger.log('debug', 'creating vacancy');
    ctx.body = await VacancyService.createVacancy(ctx.request.body);
  } catch (err) {
    logger.log('error', 'add vacancy error');
  }
};

const updateVacancy = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.vacancy)}`);
};

const deleteVacancy = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.vacancy)}`);
};

export default {
  getVacancies,
  addVacancy,
  getVacancy,
  updateVacancy,
  deleteVacancy,
};
