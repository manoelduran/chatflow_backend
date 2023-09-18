import { v4 as uuidV4 } from "uuid";
import { Either, left, right } from "@shared/either";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { MessageModel } from "@modules/Message/infra/persistence/models/Message";
import { MessageNotFoundException } from "@modules/Message/exceptions/MessageNotFoundException";
import { CreateMessageDTO } from "@modules/Message/dtos/CreateMessageDTO";

class MessagesRepositoryInMemory implements IMessagesRepository {
  private messages: MessageModel[];
  constructor() {
    this.messages = [];
  }
  async findAllUserMessagesInChat(
    chat_id: string,
    user_id: string
  ): Promise<Either<MessageNotFoundException, MessageModel[]>> {
    const messages = this.messages.filter(
      (message) => message.chatId === chat_id && message.userId === user_id
    );
    if (!messages || messages.length === 0) {
      return left(new MessageNotFoundException());
    }
    return right(messages);
  }
  async findAllByChat(
    chat_id: string
  ): Promise<Either<MessageNotFoundException, MessageModel[]>> {
    const messages = this.messages.filter(
      (message) => message.chatId === chat_id
    );
    if (!messages || messages.length === 0) {
      return left(new MessageNotFoundException());
    }
    return right(messages);
  }
  async findSpecificMessage(
    chat_id: string,
    user_id: string,
    text: string
  ): Promise<Either<MessageNotFoundException, MessageModel>> {
    const messageOrError = this.messages.find(
      (message) =>
        message.chatId === chat_id && message.userId === user_id && message.text
    );
    if (!messageOrError) {
      return left(new MessageNotFoundException());
    }
    return right(messageOrError);
  }

  async findAllByUser(
    user_id: string
  ): Promise<Either<MessageNotFoundException, MessageModel[]>> {
    const messages = this.messages.filter(
      (message) => message.userId === user_id
    );
    if (!messages || messages.length === 0) {
      return left(new MessageNotFoundException());
    }
    return right(messages);
  }
  async findByName(
    name: string
  ): Promise<Either<MessageNotFoundException, MessageModel>> {
    const message = this.messages.find((message) => message.text === name);
    if (!message) {
      return left(new MessageNotFoundException());
    }
    return right(message);
  }
  async findById(
    id: string
  ): Promise<Either<MessageNotFoundException, MessageModel>> {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      return left(new MessageNotFoundException());
    }
    return right(message);
  }
  async create(data: CreateMessageDTO): Promise<MessageModel> {
    const newMessage = new MessageModel({
      ...data,
      id: uuidV4(),
      chatId: data.chat_id,
      sentAt: new Date(),
      userId: data.user_id,
    });
    Object.assign(newMessage, data);
    this.messages.push(newMessage);
    return newMessage;
  }
  async list(): Promise<MessageModel[]> {
    const messages = this.messages;
    return messages;
  }
}

export { MessagesRepositoryInMemory };
