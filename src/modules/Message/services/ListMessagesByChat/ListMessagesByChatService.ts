import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ListMessagesByChatDTO } from "@modules/Message/dtos/ListMessagesByChatDTO";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { ListMessagesByChatResponse } from "@modules/Message/responses/ListMessagesByChatResponse";
import { left } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class ListMessagesByChatService {
    constructor(
        @inject("MessagesRepository")
        private messagesRepository: IMessagesRepository,
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
    ) { }
    async execute({ chat_id }: ListMessagesByChatDTO): ListMessagesByChatResponse {
        const chatOrError = await this.chatsRepository.findById(chat_id);
        if (chatOrError.isLeft()) {
            return left(chatOrError.value);
        };
        const messages = await this.messagesRepository.findAllByChat(chatOrError.value.id);
        console.log('messages', messages)
        return messages;
    };
};

export { ListMessagesByChatService };