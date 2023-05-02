import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserAlreadyExistsException } from "@modules/User/exceptions/UserAlreadyExistsException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { CreateUserResponse } from "@modules/User/responses/CreateUserResponse";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: CreateUserDTO): CreateUserResponse {

        const userAlreadyExists = await this.usersRepository.findByData(data.username, data.email);
        if (userAlreadyExists.isRight()) {
            return left(new UserAlreadyExistsException());
        };
        const newUser = await this.usersRepository.create(data);

        return right(newUser);
    };
};

export { CreateUserService };