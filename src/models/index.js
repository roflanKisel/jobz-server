import User from './user';
import Company from './company';
import Vacancy from './vacancy';

User.hasMany(Company, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Company.belongsTo(User, {
  foreignKey: 'userId',
});

Company.hasMany(Vacancy, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE',
});

Vacancy.belongsTo(Company, {
  foreignKey: 'companyId',
});

export {
  User,
  Company,
  Vacancy,
};
