import { container } from "tsyringe";
import { AddressesRepository } from "../infra/persistence/repositories/AddressesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";

container.registerSingleton<IAddressesRepository>(
  "AddressesRepository",
  AddressesRepository
);
