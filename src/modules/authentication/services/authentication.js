import passport from 'koa-passport';
import { User } from '../../../models';
import jwtService from './jwt-service';

class UserService {
  static async createUser(userData) {
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
  }

  static async authenticateUser(ctx) {
    return passport.authenticate('local', (err, user) => {
      if (user) {
        const token = jwtService.getToken(ctx.request.body);
        user.password = undefined;
        ctx.body = { token, user };
      } else {
        ctx.body = { token: false, error: err };
        ctx.status = 401;
      }
    })(ctx);
  }

  static async findUser(token) {
    const user = jwtService.verify(token);
    const foundUser = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { email: user.email },
    });

    if (!foundUser) {
      throw new Error('User is not found');
    }

    return foundUser;
  }

  static async findUserById(id) {
    const foundUser = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id },
    });

    if (!foundUser) {
      throw new Error(`User with id: ${id} not found`);
    }

    return foundUser;
  }

  static async deleteUserUsingToken(token) {
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
  }

  static async deleteUserUsingId(token, id) {
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
  }
}

export default UserService;
