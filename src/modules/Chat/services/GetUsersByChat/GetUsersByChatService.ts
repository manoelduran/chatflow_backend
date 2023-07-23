import { GetUsersByChatDTO } from "@modules/Chat/dtos/GetUsersByChatDTO";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { GetUsersByChatResponse } from "@modules/Chat/responses/GetUsersByChatResponse";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class GetUsersByChatService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
    ) { }
    async execute({chat_id}: GetUsersByChatDTO): GetUsersByChatResponse {
        const usesrOrError = await this.chatsRepository.getUsersByChatId(chat_id);
        return usesrOrError;
    };
};

export { GetUsersByChatService };