import { Either } from "@shared/either";
import { CreateMessageDTO } from "@modules/Message/dtos/CreateMessageDTO";
import { MessageModel } from "@modules/Message/infra/persistence/models/Message";
import { MessageNotFoundException } from "../exceptions/MessageNotFoundException";

interface IMessagesRepository {
    create(data: CreateMessageDTO): Promise<MessageModel>;
    findById(id: string): Promise<Either<MessageNotFoundException, MessageModel>>;
    findSpecificMessage(chat_id: string, user_id: string, text: string): Promise<Either<MessageNotFoundException, MessageModel>>;
    findAllUserMessagesInChat(chat_id: string, user_id: string): Promise<Either<MessageNotFoundException, MessageModel[]>>
    findAllByUser(user_id: string): Promise<Either<MessageNotFoundException, MessageModel[]>>;
    list(): Promise<MessageModel[]> ;
};

export { IMessagesRepository };
