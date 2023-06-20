import { GetChatDTO } from "@modules/Chat/dtos/GetChatDTO";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { GetChatResponse } from "@modules/Chat/responses/GetChatResponse";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class GetChatService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
    ) { }
    async execute({chat_id}: GetChatDTO): GetChatResponse {
        const chatOrError = await this.chatsRepository.findById(chat_id);
        if(chatOrError.isLeft()) {
            return left(chatOrError.value)
        }
        return right(chatOrError.value);
    };
};

export { GetChatService };