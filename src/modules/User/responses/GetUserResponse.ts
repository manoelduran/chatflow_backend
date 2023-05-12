import { Either } from '@shared/either';
import { UserModel } from '@modules/User/infra/persistence/models/User';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';



export type GetUserResponse  = Promise<
  Either<
  UserNotFoundException,
    UserModel
  >
>;
