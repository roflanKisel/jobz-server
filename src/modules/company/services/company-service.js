import { Company } from '../../../models';

const createCompany = async (companyData) => {
  const newCompany = await Company.create(companyData);

  return newCompany;
};

const updateCompany = async () => {
  // TODO: implement company updating
};

const deleteCompany = async () => {
  // TODO: implement company deleting
};

export default {
  createCompany,
  updateCompany,
  deleteCompany,
};
