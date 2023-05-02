import { BaseException } from "@shared/domain/BaseException";


export class UserAlreadyExistsException extends Error implements BaseException {
  statusCode: number;

  constructor() {
    super('Already exists this user, try another credentials.');
    this.name = 'UserAlreadyExistsException';
    this.statusCode = 400;
  }
}
