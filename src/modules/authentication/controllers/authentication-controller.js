import logger from '../../../utils/logger';
import UserService from '../services/authentication';

const signUp = async (ctx) => {
  try {
    logger.log('debug', JSON.stringify(ctx.request.body));
    ctx.body = await UserService.createUser(ctx.request.body);
    ctx.status = 200;
    logger.log('debug', JSON.stringify(ctx.body));
  } catch (err) {
    ctx.status = 500;
    logger.log('error', err);
  }
};

const signIn = async (ctx) => {
  try {
    logger.log('debug', JSON.stringify(ctx.request.body));
    await UserService.authenticateUser(ctx);
    logger.log('debug', JSON.stringify(ctx.body));
  } catch (err) {
    ctx.status = 500;
    logger.log('error', err);
  }
};

const get = async (ctx) => {
  try {
    const authorizationToken = ctx.request.body.token;
    logger.log('debug', authorizationToken);

    if (authorizationToken) {
      ctx.body = await UserService.findUser(authorizationToken);
      ctx.status = 200;
      logger.log('debug', JSON.stringify(ctx.body));
    }
  } catch (err) {
    ctx.status = 500;
    logger.log('error', err);
  }
};

const deleteUserById = async (ctx) => {
  try {
    const { token, id } = ctx.request.body;
    logger.log('debug', token);

    if (token) {
      ctx.body = await UserService.deleteUserUsingId(token, id);
      ctx.status = 200;
      logger.log('debug', JSON.stringify(ctx.body));
    }
  } catch (err) {
    ctx.status = 401;
    logger.log('error', err);
  }
};

const deleteUserByToken = async (ctx) => {
  try {
    const { token } = ctx.request.body;

    logger.log('debug', token);

    if (token) {
      ctx.body = await UserService.deleteUserUsingToken(token);
      ctx.status = 200;
      logger.log('debug', JSON.stringify(ctx.body));
    }
  } catch (err) {
    ctx.status = 409;
    logger.log('error', err);
  }
};

export default {
  signIn,
  signUp,
  get,
  deleteUserById,
  deleteUserByToken,
};
