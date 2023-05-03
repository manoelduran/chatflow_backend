import { Either } from "@shared/either";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { ChatModel } from "@modules/Chat/infra/persistence/models/Chat";
import { JoinChatDTO } from "../dtos/JoinChatDTO";

interface IChatsRepository {
    create(data: CreateChatDTO): Promise<ChatModel>;
    update(data: JoinChatDTO): Promise<ChatModel>
    findById(id: string): Promise<Either<ChatNotFoundException, ChatModel>>;
    findByName(name: string): Promise<Either<ChatNotFoundException, ChatModel>>;
    list(): Promise<ChatModel[]> ;
};

export { IChatsRepository };
