import { CreateAddressDTO } from "@modules/Address/dtos/CreateAddressDTO";
import { IAddressesRepository } from "@modules/Address/repositories/IAddressesRepository";
import { CreateAddressResponse } from "@modules/Address/responses/CreateAddressResponse";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { IGatewayProvider } from "@shared/container/providers/GatewayProvider/models/IGatewayProvider";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateAddressService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository,
    @inject("GatewayProvider")
    private gatewayProvider: IGatewayProvider
  ) {}
  async execute(
    data: CreateAddressDTO,
    customer_id: string
  ): CreateAddressResponse {
    console.log("customer_id", customer_id);
    const foundUser = await this.usersRepository.findByWhere(customer_id);
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    console.log("foundUser", foundUser);
    const billingAddress = await this.gatewayProvider.putBillingAddress(
      data,
      foundUser.value.customer_id
    );
    if (billingAddress.isLeft()) {
      return left(billingAddress.value);
    }
    const newAddress = await this.addressesRepository.create(
      billingAddress.value
    );

    await this.usersRepository.update(
      { addressId: newAddress.id, updated_at: new Date(), ...foundUser.value },
      foundUser.value.customer_id
    );
    return right(newAddress);
  }
}

export { CreateAddressService };
