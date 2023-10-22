import { prisma } from "@shared/infra/orm/prisma";
import { Either, left, right } from "@shared/either";
import { PrismaClient } from "@prisma/client";
import { IAddressesRepository } from "@modules/Address/repositories/IAddressesRepository";
import { CreateAddressDTO } from "@modules/Address/dtos/CreateAddressDTO";
import { AddressNotFoundException } from "@modules/Address/exceptions/AddressNotFoundException";
import { AddressModel } from "../models/Address";

class AddressesRepository implements IAddressesRepository {
  private ormRepository: PrismaClient;
  constructor() {
    this.ormRepository = prisma;
  }
  public async create(data: CreateAddressDTO): Promise<AddressModel> {
    const newAddress = await this.ormRepository.address.create({ data });
    return newAddress;
  }
  public async findByWhere(
    id?: string,
    postal_code?: string,
    stripe_billing_address_id?: string
  ): Promise<Either<AddressNotFoundException, AddressModel>> {
    const foundAddress = await this.ormRepository.address.findFirst({
      where: {
        OR: [{ id }, { postal_code }, { stripe_billing_address_id }],
      },
    });
    if (!foundAddress) {
      return left(new AddressNotFoundException());
    }
    return right(foundAddress);
  }
  public async list(): Promise<AddressModel[]> {
    return await this.ormRepository.address.findMany();
  }
}

export { AddressesRepository };
