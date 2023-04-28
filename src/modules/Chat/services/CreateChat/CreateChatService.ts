import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateChatService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository
    ) { }
    async execute(data: CreateChatDTO): CreateChatResponse {
        const chatAlreadyExists = await this.chatsRepository.findByName(data.name);
        if (chatAlreadyExists.isRight()) {
            return left(new ChatAlreadyExistsException());
        };
        const newChat = await this.chatsRepository.create(data);
        return right(newChat);
    };
};

export { CreateChatService };