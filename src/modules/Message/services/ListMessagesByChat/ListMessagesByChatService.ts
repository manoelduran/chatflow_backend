import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ListMessagesByChatDTO } from "@modules/Message/dtos/ListMessagesByChatDTO";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { ListMessagesByChatResponse, MessageWithUser } from "@modules/Message/responses/ListMessagesByChatResponse";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class ListMessagesByChatService {
    constructor(
        @inject("MessagesRepository")
        private messagesRepository: IMessagesRepository,
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ chat_id }: ListMessagesByChatDTO): ListMessagesByChatResponse {
        let parsedMessage = {} as MessageWithUser;
        let parsedMessagesWithUsers = [] as MessageWithUser[];
        const chatOrError = await this.chatsRepository.findById(chat_id);
        if (chatOrError.isLeft()) {
            return left(chatOrError.value);
        };
        const messages = await this.messagesRepository.findAllByChat(chatOrError.value.id);
        if (messages.isLeft()) {
            return left(messages.value)
        }
        for (const message of messages.value) {
            const ownerName = await this.usersRepository.findById(message.userId)
            if (ownerName.isLeft()) {
                return left(ownerName.value)
            }
            parsedMessage = {
                message,
                owner: ownerName.value.username
            }
            parsedMessagesWithUsers.push(parsedMessage)
        }
        return right(parsedMessagesWithUsers);
    };
};

export { ListMessagesByChatService };