import { Vacancy } from '../../../models';

const createVacancy = async (vacancyData) => {
  const newVacancy = await Vacancy.create(vacancyData);

  return newVacancy;
};

const updateVacancy = async () => {
  // TODO: implement Vacancy updating
};

const deleteVacancy = async () => {
  // TODO: implement Vacancy deleting
};

export default {
  createVacancy,
  updateVacancy,
  deleteVacancy,
};
