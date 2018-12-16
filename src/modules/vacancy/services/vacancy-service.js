import { Vacancy } from '../../../models';

const createVacancy = async (vacancyData) => {
  const newVacancy = await Vacancy.create(vacancyData);

  return newVacancy;
};

export default {
  createVacancy,
};
