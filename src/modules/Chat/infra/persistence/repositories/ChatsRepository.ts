import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ChatModel } from "../models/Chat";
import { prisma } from "@shared/infra/orm/prisma";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { Either, left, right } from "@shared/either";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { PrismaClient } from "@prisma/client";


class ChatsRepository implements IChatsRepository {
    private ormRepository: PrismaClient
    constructor() {
        this.ormRepository = prisma
    }
    async create(data: CreateChatDTO): Promise<ChatModel> {
        const chat = await this.ormRepository.chat.create({data});
        return chat;
      }
      async list(): Promise<ChatModel[]> {
        const chats = await this.ormRepository.chat.findMany();
        return chats;
      }
      async findByName(name: string): Promise<Either<ChatNotFoundException, ChatModel>> {
        const chatOrError = await this.ormRepository.chat.findUnique({
            where: {
                name,
            },
        });
        if(!chatOrError) {
            return left(new ChatNotFoundException())
        }
        return right(chatOrError);
    }
      async findById(id: string): Promise<Either<ChatNotFoundException, ChatModel>> {
        const chatOrError = await this.ormRepository.chat.findUnique({
            where: {
                id,
            },
        });
        if(!chatOrError) {
            return left(new ChatNotFoundException())
        }
        return right(chatOrError);
      }
};

export { ChatsRepository };