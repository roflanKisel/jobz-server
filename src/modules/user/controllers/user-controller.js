import logger from '../../../utils/logger';
import { User, UserVacancies, Vacancy } from '../../../models';
import UserService from '../services/user-service';

const getUsers = async (ctx) => {
  try {
    logger.log('debug', 'in getCompanies');
    ctx.body = await User.findAll({
      attributes: { exclude: ['password'] },
    });
  } catch (err) {
    logger.log('error', 'error in getCompanies');
  }
};

const getUserCompanies = async (ctx) => {
  try {
    logger.log('debug', 'in getUserCompanies');
    ctx.body = await UserService.getUserCompanies(ctx.params.id);
  } catch (err) {
    logger.log('error', 'error in getUserCompanies');
  }
};

const getUserVacancies = async (ctx) => {
  try {
    logger.log('debug', 'in getUserVacancies');
    ctx.body = await UserService.getUserVacancies(ctx.user.id);
  } catch (err) {
    logger.log('error', 'error in getUserVacancies');
  }
};

const updateUser = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);
};

const deleteUser = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);
};

const getUserFavoriteVacancies = async (ctx) => {
  logger.log('debug', 'get user favorites');

  try {
    const firstQuery = {
      where: {
        userId: ctx.params.id,
      },
    };

    const data = await UserVacancies.findAll(firstQuery);
    const vacancies = data.map(dataPart => Vacancy.findById(dataPart.vacancyId));

    ctx.body = await Promise.all(vacancies);
  } catch (err) {
    logger.log('error', 'error getting favorite vacancies');
  }
};

const addUserFavoriteVacancy = async (ctx) => {
  logger.log('debug', 'adding favorite vacancy to user');

  try {
    const { vacancyId } = ctx.request.body;
    const { id } = ctx.params;

    ctx.body = await UserVacancies.create({
      userId: parseInt(id, 10),
      vacancyId,
    });
  } catch (err) {
    logger.log('error', 'error adding favorite user vacancy');
  }
};

const removeUserFavoriteVacancy = async (ctx) => {
  try {
    const { vacancyId } = ctx.query;
    const { id } = ctx.params;

    const query = {
      where: {
        userId: id,
        vacancyId,
      },
    };

    const record = await UserVacancies.findOne(query);

    if (record) {
      record.destroy();
    }

    ctx.body = {
      success: true,
    };
  } catch (err) {
    logger.log('error', 'error removing favorite user vacancy');
  }
};

export default {
  getUsers,
  getUserCompanies,
  getUserVacancies,
  updateUser,
  deleteUser,
  getUserFavoriteVacancies,
  addUserFavoriteVacancy,
  removeUserFavoriteVacancy,
};
