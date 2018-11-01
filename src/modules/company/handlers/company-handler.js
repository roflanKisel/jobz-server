import { Company } from '../../../models';

const findCompany = async (id, ctx, next) => {
  ctx.company = await Company.findById(id);
  return next();
};

export {
  findCompany,
};
