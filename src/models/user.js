import Sequelize from 'sequelize';
import sequelize from '../helpers/database';
import Company from './company';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthday: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default',
  },
  // TODO: add fields: resume, avatar
});

export default User;
