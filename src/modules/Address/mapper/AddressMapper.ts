import { Mapper } from "@shared/domain/Mapper";
import { AddressModel } from "../infra/persistence/models/Address";

export class AddressMapper implements Mapper<AddressModel> {
  public static toPresenter({ ...data }: AddressModel): any {
    return {
      ...data,
    };
  }
}
