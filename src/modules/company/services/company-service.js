import { Company } from '../../../models';

const createCompany = async (companyData) => {
  const newCompany = await Company.create(companyData);

  return newCompany;
};

const updateCompany = async (company, data) => {
  const updatedCompany = await company.update({ data });

  return updatedCompany;
};

const deleteCompany = async (company) => {
  const deletedCompany = await company.destroy();

  return deletedCompany;
};

export default {
  createCompany,
  updateCompany,
  deleteCompany,
};
