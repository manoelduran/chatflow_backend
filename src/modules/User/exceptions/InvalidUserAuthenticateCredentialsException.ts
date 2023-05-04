import { BaseException } from '@shared/domain/BaseException';

export class InvalidUserAuthenticateCredentialsException extends Error implements BaseException {
  statusCode: number;

  constructor() {
    super('Invalid credentials.');
    this.statusCode = 400;
    this.name = 'InvalidUserAuthenticateCredentialsException';
  }
}