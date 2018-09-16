import Sequelize from 'sequelize';
import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_HOST,
  DATABASE_PORT,
} from '../constants/database';

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'mysql',
  port: DATABASE_PORT,
  operatorsAliases: false,
});

export default sequelize;
