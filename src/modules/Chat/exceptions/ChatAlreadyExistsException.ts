import { BaseException } from "@shared/domain/BaseException";


export class ChatAlreadyExistsException extends Error implements BaseException {
  statusCode: number;

  constructor() {
    super('Already exists a chat with this name.');
    this.name = 'ChatAlreadyExistsException';
    this.statusCode = 400;
  }
}
