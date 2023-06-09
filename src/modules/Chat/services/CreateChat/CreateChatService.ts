import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateChatService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: CreateChatDTO): CreateChatResponse {
        const userOrError = await this.usersRepository.findById(data.user_id);
        if (userOrError.isLeft()) {
            return left(new UserNotFoundException());
        };
        const chatAlreadyExists = await this.chatsRepository.findByName(data.name);
        if (chatAlreadyExists.isRight()) {
            return left(new ChatAlreadyExistsException());
        };
        const newChat = await this.chatsRepository.create({name: data.name, user: userOrError.value});

        return right(newChat);
    };
};

export { CreateChatService };