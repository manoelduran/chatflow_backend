import { BaseException } from "@shared/domain/BaseException";

export class UserNotFoundException extends Error implements BaseException {
  public statusCode: number;

  constructor() {
    super('This user does not exists.');
    this.statusCode = 404;
    this.name = 'UserNotFoundException';
  }
}
