import path from 'path';

const env = {
  PORT: 3000,
  MODE: 'development',
  jwt: {
    secret: 'super-secret-key',
  },
};

const VIEW_PATH = `${path.resolve('.')}/app/views`;

export default {
  env,
  VIEW_PATH,
};
