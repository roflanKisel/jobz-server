import { Vacancy } from '../../../models';

const findVacancy = async (id, ctx, next) => {
  ctx.vacancy = await Vacancy.findById(id);
  return next();
};

export {
  findVacancy,
};
