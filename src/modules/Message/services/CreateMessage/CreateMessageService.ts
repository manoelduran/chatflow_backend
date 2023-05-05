import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { CreateMessageDTO } from "@modules/Message/dtos/CreateMessageDTO";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { CreateMessageResponse } from "@modules/Message/responses/CreateMessageResponse";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateMessageService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("MessagesRepository")
        private messagesRepository: IMessagesRepository
    ) { }
    async execute(data: CreateMessageDTO): CreateMessageResponse {
        const userOrError = await this.usersRepository.findById(data.user_id);
        if (userOrError.isLeft()) {
            return left(new UserNotFoundException());
        };
        const chatAlreadyExists = await this.chatsRepository.findById(data.chat_id);
        if (chatAlreadyExists.isLeft()) {
            return left(new ChatNotFoundException());
        };
        const newChat = await this.messagesRepository.create(data);

        return right(newChat);
    };
};

export { CreateMessageService };