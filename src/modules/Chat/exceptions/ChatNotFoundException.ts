import { BaseException } from "@shared/domain/BaseException";

export class ChatNotFoundException extends Error implements BaseException {
  public statusCode: number;

  constructor() {
    super('This chat does not exists.');
    this.statusCode = 404;
    this.name = 'ChatNotFoundException';
  }
}
