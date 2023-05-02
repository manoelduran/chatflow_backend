import { Either } from '@shared/either';
import { UserModel } from '@modules/User/infra/persistence/models/User';
import { UserAlreadyExistsException } from '@modules/User/exceptions/UserAlreadyExistsException';



export type CreateUserResponse = Promise<
  Either<
  UserAlreadyExistsException,
    UserModel
  >
>;
