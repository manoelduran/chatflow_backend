import { Either, left, right } from "@shared/either";
import { v4 as uuidV4 } from "uuid";
import { IAddressesRepository } from "../IAddressesRepository";
import { AddressModel } from "@modules/Address/infra/persistence/models/Address";
import { CreateAddressDTO } from "@modules/Address/dtos/CreateAddressDTO";
import { AddressNotFoundException } from "@modules/Address/exceptions/AddressNotFoundException";

class AddressesRepositoryInMemory implements IAddressesRepository {
  private address: AddressModel[];
  constructor() {
    this.address = [];
  }
  async findByWhere(
    id?: string,
    postal_code?: string
  ): Promise<Either<AddressNotFoundException, AddressModel>> {
    const foundAddress = this.address.find(
      (address) => address.id === id || address.postal_code === postal_code
    );
    if (!foundAddress) {
      return left(new AddressNotFoundException());
    }
    return right(foundAddress);
  }
  async create(data: CreateAddressDTO): Promise<AddressModel> {
    const newAddress = new AddressModel({
      id: uuidV4(),
      created_at: new Date(),
      stripe_billing_address_id: uuidV4(),
      ...data,
    });
    Object.assign(newAddress, data);
    this.address.push(newAddress);
    return newAddress;
  }
  async list(): Promise<AddressModel[]> {
    const address = this.address;
    return address;
  }
}

export { AddressesRepositoryInMemory };
