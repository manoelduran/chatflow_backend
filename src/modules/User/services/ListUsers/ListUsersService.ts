import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { ListUsersResponse } from "@modules/User/responses/ListUsersResponse";
import { inject, injectable } from "tsyringe";


@injectable()
class ListUsersService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(): ListUsersResponse {
        const users = await this.usersRepository.list();
        return users;
    };
};

export { ListUsersService };