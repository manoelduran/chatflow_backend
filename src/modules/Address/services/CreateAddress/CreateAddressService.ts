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
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("GatewayProvider")
    private gatewayProvider: IGatewayProvider
  ) {}
  async execute({
    city,
    country,
    line1,
    postal_code,
    state,
    user_id,
  }: CreateAddressDTO & { user_id: string }): CreateAddressResponse {
    const foundUser = await this.usersRepository.findById(user_id);
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    const billingAddress = await this.gatewayProvider.putBillingAddress(
      {
        city,
        country,
        line1,
        postal_code,
        state,
      },
      foundUser.value.customer_id
    );
    if (billingAddress.isLeft()) {
      return left(billingAddress.value);
    }
    const { line2, ...data } = billingAddress.value.address;
    const newAddress = await this.addressesRepository.create(data);

    await this.usersRepository.update(
      { addressId: newAddress.id, updated_at: new Date(), ...foundUser.value },
      foundUser.value.customer_id
    );
    return right(newAddress);
  }
}

export { CreateAddressService };
