import { Either } from "@shared/either";
import { CreateAddressDTO } from "../dtos/CreateAddressDTO";
import { AddressModel } from "../infra/persistence/models/Address";
import { AddressNotFoundException } from "../exceptions/AddressNotFoundException";

interface IAddressesRepository {
  create(data: CreateAddressDTO): Promise<AddressModel>;
  findByWhere(
    id?: string,
    postal_code?: string,
    stripe_billing_address_id?: string
  ): Promise<Either<AddressNotFoundException, AddressModel>>;
  list(): Promise<AddressModel[]>;
}

export { IAddressesRepository };
