import Sequelize from 'sequelize';
import { Company } from './company';
import sequelize from '../helpers/database';

const Vacancy = sequelize.define('vacancy', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  employeePosition: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estimatedSalary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  approved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Vacancy;
