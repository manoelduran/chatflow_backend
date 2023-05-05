import { BaseException } from "@shared/domain/BaseException";

export class MessageNotFoundException extends Error implements BaseException {
  public statusCode: number;

  constructor() {
    super('This message does not exists.');
    this.statusCode = 404;
    this.name = 'MessageNotFoundException';
  }
}
