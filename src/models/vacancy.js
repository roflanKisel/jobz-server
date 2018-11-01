import Sequelize from 'sequelize';
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Vacancy;
