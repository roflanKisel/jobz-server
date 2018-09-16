import jwt from 'jsonwebtoken';
import config from '../../../config';

const { secret } = config.env.jwt;

export default {
  getToken(data) {
    return jwt.sign(data, secret);
  },

  verify(token) {
    return jwt.verify(token, secret);
  },
};
