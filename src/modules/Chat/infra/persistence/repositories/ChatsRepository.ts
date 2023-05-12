import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { ChatModel } from "../models/Chat";
import { prisma } from "@shared/infra/orm/prisma";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { Either, left, right } from "@shared/either";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { PrismaClient } from "@prisma/client";
import { JoinChatDTO } from "@modules/Chat/dtos/JoinChatDTO";


class ChatsRepository implements IChatsRepository {
    private ormRepository: PrismaClient
    constructor() {
        this.ormRepository = prisma
    }
    async update(data: JoinChatDTO): Promise<ChatModel> {
        const { chat_id, user_id } = data
        const updatedChat = await prisma.chat.update({
            where: { id: chat_id },
            data: {
                UsersOnChats: {
                    create: [
                        {
                            userId: user_id
                        }
                    ]
                },
            },
        })
        return updatedChat
    }
    async create(data: CreateChatDTO): Promise<ChatModel> {
        const { name, user } = data
        const chat = await this.ormRepository.chat.create({
            data: {
                name: name,
                owner_id: user.id,
                UsersOnChats: {
                   create: [
                    {
                        userId: user.id
                    }
                   ]
                }
            }
        });
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
        if (!chatOrError) {
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
        if (!chatOrError) {
            return left(new ChatNotFoundException())
        }
        return right(chatOrError);
    }
};

export { ChatsRepository };