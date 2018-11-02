import { User, Company } from '../../../models';

const getUserCompanies = async (id) => {
  const companies = await Company.findAll({
    where: {
      userId: id,
    },
  });

  return companies;
};

const updateUser = async () => {
  // TODO: implement company updating
};

const deleteUser = async () => {
  // TODO: implement company deleting
};

export default {
  getUserCompanies,
  updateUser,
  deleteUser,
};
