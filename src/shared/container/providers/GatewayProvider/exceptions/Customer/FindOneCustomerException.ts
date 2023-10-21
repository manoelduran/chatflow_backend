import { BaseException } from "@shared/domain/BaseException";

export class FindOneCustomerException extends Error implements BaseException {
  statusCode: number;

  constructor() {
    super("Invalid parameters.");
    this.statusCode = 400;
    this.name = "FindOneCustomerException";
  }
}
