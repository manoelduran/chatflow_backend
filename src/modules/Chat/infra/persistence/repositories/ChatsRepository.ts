import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ChatModel } from "../models/Chat";
import { prisma } from "@shared/infra/orm/prisma";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { Either, left, right } from "@shared/either";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { Chat, PrismaClient } from "@prisma/client";


class ChatsRepository implements IChatsRepository {

    async create(data: CreateChatDTO): Promise<ChatModel> {
        const chat = await prisma.chat.create({data});
        return chat;
      }
    
      async list(): Promise<ChatModel[]> {
        const chats = await prisma.chat.findMany();
        return chats;
      }
      async findByName(name: string): Promise<Either<ChatNotFoundException, ChatModel>> {
        const chatOrError = await prisma.chat.findUnique({
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
        const chatOrError = await prisma.chat.findUnique({
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