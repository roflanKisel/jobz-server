import logger from '../../../utils/logger';
import { User } from '../../../models';
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
    ctx.body = await UserService.getUserCompanies(ctx.user.id);
  } catch (err) {
    logger.log('error', 'error in getUserCompanies');
  }
};

const updateUser = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);
};

const deleteUser = async (ctx) => {
  logger.log('debug', `${JSON.stringify(ctx.company)}`);
};

export default {
  getUsers,
  getUserCompanies,
  updateUser,
  deleteUser,
};
