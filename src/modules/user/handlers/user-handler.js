import { User } from '../../../models';

const findUser = async (id, ctx, next) => {
  ctx.user = await User.findById(id);
  return next();
};

export {
  findUser,
};
