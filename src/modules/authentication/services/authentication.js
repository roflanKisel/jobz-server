import passport from 'koa-passport';
import { User } from '../../../models';
import jwtService from './jwt-service';

const createUser = async (userData) => {
  const { email } = userData;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    const token = jwtService.getToken(userData);
    User.create({ ...userData });
    return {
      token,
      user: { ...userData, password: undefined },
    };
  }

  throw new Error('User is already exist');
};

const authenticateUser = async ctx => passport.authenticate('local', (err, user) => {
  if (user) {
    const token = jwtService.getToken(ctx.request.body);
    user.password = undefined;
    ctx.body = { token, user };
  } else {
    ctx.body = { token: false, error: err };
    ctx.status = 401;
  }
})(ctx);

const findUser = async (token) => {
  const user = jwtService.verify(token);
  const foundUser = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { email: user.email },
  });

  if (!foundUser) {
    throw new Error('User is not found');
  } else {
    return foundUser;
  }
};

const findUserById = async (id) => {
  const foundUser = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (!foundUser) {
    throw new Error(`User with id: ${id} not found`);
  }

  return foundUser;
};

const deleteUserUsingToken = async (token) => {
  const user = jwtService.verify(token);
  const foundUser = await User.findOne({
    where: {
      email: user.email,
    },
  });

  if (foundUser) {
    return foundUser.destroy();
  }

  throw new Error('Error deleting user');
};

const deleteUserUsingId = async (token, id) => {
  const adminData = jwtService.verify(token);
  const admin = await User.findOne({
    where: {
      email: adminData.email,
      role: 'admin',
    },
  });

  if (admin) {
    const user = await User.findOne({
      where: { id },
    });

    if (user) {
      return user.destroy();
    }

    throw new Error(`User with id: ${id} not found`);
  }

  throw new Error('Permission denied');
};

export default {
  createUser,
  authenticateUser,
  findUser,
  findUserById,
  deleteUserUsingToken,
  deleteUserUsingId,
};
