import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ListChatsResponse } from "@modules/Chat/responses/ListChatsResponse";
import { inject, injectable } from "tsyringe";


@injectable()
class ListChatsService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository
    ) { }
    async execute(): ListChatsResponse {
        const chats = await this.chatsRepository.list();
        return chats;
    };
};

export { ListChatsService };