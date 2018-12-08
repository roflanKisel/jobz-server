import { Vacancy, Company } from '../../../models';

const findVacancy = async (id, ctx, next) => {
  const query = {
    where: {
      id,
    },
    include: [{
      model: Company,
    }],
  };

  ctx.vacancy = await Vacancy.findOne(query);
  return next();
};

/* eslint-disable import/prefer-default-export */
export {
  findVacancy,
};
