import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { JoinChatDTO } from "@modules/Chat/dtos/JoinChatDTO";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { UpdateChatResponse } from "@modules/Chat/responses/UpdateChatResponse";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class JoinChatService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(data: JoinChatDTO): UpdateChatResponse {
        const userOrError = await this.usersRepository.findById(data.user_id);
        if (userOrError.isLeft()) {
            return left(userOrError.value);
        };
        const chatOrError = await this.chatsRepository.findById(data.chat_id);
        if (chatOrError.isLeft()) {
            return left(chatOrError.value);
        };
        const updatedChat = await this.chatsRepository.update(data);
        return right(updatedChat);
    };
};

export { JoinChatService };