import { Company, Vacancy } from '../../../models';

const getUserCompanies = async (id) => {
  const companies = await Company.findAll({
    where: {
      userId: id,
    },
  });

  return companies;
};

const getUserVacancies = async (id) => {
  const vacancies = await Vacancy.findAll({
    where: {
      userId: id,
    },
  });

  return vacancies;
};

const updateUser = async () => {
  // TODO: implement company updating
};

const deleteUser = async () => {
  // TODO: implement company deleting
};

export default {
  getUserCompanies,
  getUserVacancies,
  updateUser,
  deleteUser,
};
