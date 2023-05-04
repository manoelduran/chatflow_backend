import { BaseException } from '@shared/domain/BaseException';

export class PasswordNeedsToBeEqualException extends Error implements BaseException {
  statusCode: number;

  constructor() {
    super('Password needs to be equal.');
    this.statusCode = 400;
    this.name = 'PasswordNeedsToBeEqualException';
  }
}