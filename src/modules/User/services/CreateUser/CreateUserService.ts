import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserAlreadyExistsException } from "@modules/User/exceptions/UserAlreadyExistsException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { CreateUserResponse } from "@modules/User/responses/CreateUserResponse";
import { IGatewayProvider } from "@shared/container/providers/GatewayProvider/models/IGatewayProvider";
import { IHashProvider } from "@shared/container/providers/HashProvider/models/IHashProvider";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("GatewayProvider")
    private gatewayProvider: IGatewayProvider
  ) {}
  async execute(data: CreateUserDTO): CreateUserResponse {
    const userAlreadyExists = await this.usersRepository.findByWhere(
      data.username,
      data.email
    );
    if (userAlreadyExists.isRight()) {
      return left(new UserAlreadyExistsException());
    }
    const customer = await this.gatewayProvider.createCustomer({
      email: data.email,
    });
    console.log("customer", customer);
    if (customer.isLeft()) {
      return left(customer.value);
    }
    console.log("customer", customer.value);
    const hashedPassword = await this.hashProvider.generateHash(data.password);
    const newUser = await this.usersRepository.create({
      ...data,
      customer_id: customer.value.id,
      password: hashedPassword,
    });

    return right(newUser);
  }
}

export { CreateUserService };
