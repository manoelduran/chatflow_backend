import { Either } from '@shared/either';
import { UserModel } from '@modules/User/infra/persistence/models/User';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';
import { PasswordNeedsToBeEqualException } from '@modules/User/exceptions/PasswordNeedsToBeEqualException';

interface Response {
  user: UserModel;
  token: string;
  refreshToken: string;
}

export type AuthUserResponse = Promise<
  Either<
  UserNotFoundException | PasswordNeedsToBeEqualException,
  Response
  >
>;
