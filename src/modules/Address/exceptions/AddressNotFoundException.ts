import { BaseException } from "@shared/domain/BaseException";

export class AddressNotFoundException extends Error implements BaseException {
  public statusCode: number;

  constructor() {
    super("This address does not exists.");
    this.statusCode = 404;
    this.name = "AddressNotFoundException";
  }
}
