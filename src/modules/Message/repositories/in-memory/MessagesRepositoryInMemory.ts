
import { Either, left, right } from '@shared/either';
import { IMessagesRepository } from '@modules/Message/repositories/IMessagesRepository';
import { MessageModel } from '@modules/Message/infra/persistence/models/Message';
import { MessageNotFoundException } from '@modules/Message/exceptions/MessageNotFoundException';
import { CreateMessageDTO } from '@modules/Message/dtos/CreateMessageDTO';




class MessagesRepositoryInMemory implements IMessagesRepository {
    private messages: MessageModel[];
    constructor() {
        this.messages = [];
    }
    findSpecificMessage(chat_id: string, user_id: string, text: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        throw new Error('Method not implemented.');
    }
    findAllUserMessagesInChat(chat_id: string, user_id: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        throw new Error('Method not implemented.');
    }
    findAllByUser(user_id: string): Promise<Either<MessageNotFoundException, MessageModel[]>> {
        throw new Error('Method not implemented.');
    }
    async findByName(name: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        const message = this.messages.find(message => message.name === name);
        if (!message) {
            return left(new MessageNotFoundException());
        };
        return right(message);
    };
    async findById(id: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        const message = this.messages.find(message => message.id === id);
        if (!message) {
            return left(new MessageNotFoundException());
        };
        return right(message);
    };
    async create(data: CreateMessageDTO): Promise<MessageModel> {
        const newMessage = new MessageModel();
        Object.assign(newMessage, data);
        this.messages.push(newMessage);
        return newMessage;
    };
    async list(): Promise<MessageModel[]> {
        const messages = this.messages;
        return messages;
    };

};

export { MessagesRepositoryInMemory };