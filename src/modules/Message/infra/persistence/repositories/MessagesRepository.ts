
import { prisma } from "@shared/infra/orm/prisma";
import { Either, left, right } from "@shared/either";
import { PrismaClient } from "@prisma/client";
import { CreateMessageDTO } from "@modules/Message/dtos/CreateMessageDTO";
import { MessageModel } from "@modules/Message/infra/persistence/models/Message";
import { MessageNotFoundException } from "@modules/Message/exceptions/MessageNotFoundException";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";


class MessagesRepository implements IMessagesRepository {
    private ormRepository: PrismaClient
    constructor() {
        this.ormRepository = prisma
    }

    async create(data: CreateMessageDTO): Promise<MessageModel> {
        const message = await this.ormRepository.message.create({
            data: {
                text: data.text,
                chatId: data.chat_id,
                userId: data.user_id,
            }
        });
        console.log('message', message)
        return message;
    }
    async list(): Promise<MessageModel[]> {
        const messages = await this.ormRepository.message.findMany();
        return messages;
    }
    async findSpecificMessage(chat_id: string, user_id: string, text: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        const messageOrError = await this.ormRepository.message.findFirst({
            where: {
                AND: [{ chatId: chat_id }, { userId: user_id }, {text: text}],
            },
        });
        if (!messageOrError) {
            return left(new MessageNotFoundException())
        }
        return right(messageOrError);
    }
    async findAllUserMessagesInChat(chat_id: string, user_id: string): Promise<Either<MessageNotFoundException, MessageModel[]>> {
        const messageOrError = await this.ormRepository.message.findMany({
            where: {
                AND: [{ chatId: chat_id }, { userId: user_id }],
            },
        });
        if (!messageOrError) {
            return left(new MessageNotFoundException())
        }
        return right(messageOrError);
    }
    async  findAllByUser(user_id: string): Promise<Either<MessageNotFoundException, MessageModel[]>> {
        const messageOrError = await this.ormRepository.message.findMany({
            where: {userId: user_id},
        });
        if (!messageOrError) {
            return left(new MessageNotFoundException())
        }
        return right(messageOrError);
    }
    async findById(id: string): Promise<Either<MessageNotFoundException, MessageModel>> {
        const messageOrError = await this.ormRepository.message.findUnique({
            where: {
                id,
            },
        });
        if (!messageOrError) {
            return left(new MessageNotFoundException())
        }
        return right(messageOrError);
    }
};

export { MessagesRepository };