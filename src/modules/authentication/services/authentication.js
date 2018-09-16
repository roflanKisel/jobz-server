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
      data: token,
    };
  }

  throw new Error('User is already exist');
};

const authenticateUser = async ctx => passport.authenticate('local', (err, user) => {
  if (user) {
    const token = jwtService.getToken(ctx.request.body);
    ctx.body = { data: token, user };
  } else {
    ctx.body = { data: false, error: err };
    ctx.status = 401;
  }
})(ctx);

const findUser = async (token) => {
  const user = jwtService.verify(token);
  const foundUser = await User.findOne({
    where: { email: user.email },
  });

  if (!foundUser) {
    throw new Error('User is not found');
  } else {
    return foundUser;
  }
};

export default {
  createUser,
  authenticateUser,
  findUser,
};
