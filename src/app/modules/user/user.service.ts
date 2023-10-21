import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { generateUserId } from './user.utils';
import ApiError from '../../../Error/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //default generated incremental user id
  const id = await generateUserId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User!');
  }
  return createdUser;
};

export const UsersService = {
  createUser,
};
