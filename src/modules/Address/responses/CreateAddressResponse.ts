import { Either } from "@shared/either";
import { AddressModel } from "../infra/persistence/models/Address";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { CreateCustomerException } from "@shared/container/providers/GatewayProvider/exceptions/Customer/CreateCustomerException";

export type CreateAddressResponse = Promise<
  Either<UserNotFoundException | CreateCustomerException, AddressModel>
>;
