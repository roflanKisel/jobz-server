import Sequelize from 'sequelize';
import sequelize from '../helpers/database';
import Vacancy from './vacancy';

const Company = sequelize.define('company', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
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
});

Company.hasMany(Vacancy, {
  as: 'Vacancies',
  foreignKey: 'companyId',
  onDelete: 'CASCADE',
});

export default Company;
