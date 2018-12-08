import sequelize from '../helpers/database';
import User from './user';
import Vacancy from './vacancy';

const UserVacancies = sequelize.define('UserVacancies', {});

User.belongsToMany(Vacancy, { through: UserVacancies, foreignKey: 'userId' });
Vacancy.belongsToMany(User, { through: UserVacancies, foreignKey: 'vacancyId' });

export default UserVacancies;
