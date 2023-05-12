import { GetUserDTO } from "@modules/User/dtos/GetUserDTO";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { GetUserResponse } from "@modules/User/responses/GetUserResponse";
import { ListUsersResponse } from "@modules/User/responses/ListUsersResponse";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class GetUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({user_id}: GetUserDTO): GetUserResponse {
        const userOrError = await this.usersRepository.findById(user_id);
        if(userOrError.isLeft()) {
            return left(userOrError.value)
        }
        return right(userOrError.value);
    };
};

export { GetUserService };