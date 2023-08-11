import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ChatWithTotalUsers, ListChatsResponse } from "@modules/Chat/responses/ListChatsResponse";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";


@injectable()
class ListChatsService {
    constructor(
        @inject("ChatsRepository")
        private chatsRepository: IChatsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(): ListChatsResponse {
        let parsedChat = {} as ChatWithTotalUsers;
        let parsedChatsWithTotalUsers = [] as ChatWithTotalUsers[];

        const chats = await this.chatsRepository.list();
    
        if(chats.length > 0) {
            for(const chat of chats) {
                const usesrOrError = await this.chatsRepository.getUsersByChatId(chat.id);
                const ownerName = await this.usersRepository.findById(chat.owner_id)
                if(ownerName.isLeft()) {
                    return left(new UserNotFoundException())
                }
                parsedChat = {
                    chat,
                    totalUsers: usesrOrError,
                    owner: ownerName.value.username
                }
                parsedChatsWithTotalUsers.push(parsedChat)
            }
        return right(parsedChatsWithTotalUsers);
        }
    };
};

export { ListChatsService };