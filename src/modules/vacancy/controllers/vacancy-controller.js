import logger from '../../../utils/logger';
import { Vacancy } from '../../../models';
import VacancyService from '../services/vacancy-service';

const getVacancies = async (ctx) => {
  try {
    logger.log('debug', 'in getVacancies');
    ctx.body = await Vacancy.findAll();
  } catch (err) {
    logger.log('error', 'error in getVacancies');
  }
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
  updateVacancy,
  deleteVacancy,
};
