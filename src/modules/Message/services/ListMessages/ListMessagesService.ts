import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { ListMessagesResponse } from "@modules/Message/responses/ListMessagesResponse";
import { inject, injectable } from "tsyringe";


@injectable()
class ListMessagesService {
    constructor(
        @inject("MessagesRepository")
        private messagesRepository: IMessagesRepository
    ) { }
    async execute(): ListMessagesResponse {
        const messages = await this.messagesRepository.list();
        return messages;
    };
};

export { ListMessagesService };