
import { Either, left, right } from '@shared/either';
import { IChatsRepository } from '../IChatsRepository';
import { ChatModel } from '@modules/Chat/infra/persistence/models/Chat';
import { ChatNotFoundException } from '@modules/Chat/exceptions/ChatNotFoundException';
import { CreateChatDTO } from '@modules/Chat/dtos/CreateChatDTO';
import { JoinChatDTO } from '@modules/Chat/dtos/JoinChatDTO';




class ChatsRepositoryInMemory implements IChatsRepository {
    private chats: ChatModel[];
    constructor() {
        this.chats = [];
    }
    update(data: JoinChatDTO): Promise<string | ChatModel> {
        throw new Error('Method not implemented.');
    }

    getUsersByChatId(chat_id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async findByName(name: string): Promise<Either<ChatNotFoundException, ChatModel>> {
        const chat = this.chats.find(chat => chat.name === name);
        if (!chat) {
            return left(new ChatNotFoundException());
        };
        return right(chat);
    };
    async findById(id: string): Promise<Either<ChatNotFoundException, ChatModel>> {
        const chat = this.chats.find(chat => chat.id === id);
        if (!chat) {
            return left(new ChatNotFoundException());
        };
        return right(chat);
    };
    async create(data: CreateChatDTO): Promise<ChatModel> {
        const newchat = new ChatModel(data);
        Object.assign(newchat, data);
        this.chats.push(newchat);
        return newchat;
    };
    async list(): Promise<ChatModel[]> {
        const chats = this.chats;
        return chats;
    };

};

export { ChatsRepositoryInMemory };