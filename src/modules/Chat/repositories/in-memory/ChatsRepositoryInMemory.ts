import { v4 as uuidV4 } from "uuid";
import { Either, left, right } from "@shared/either";
import { IChatsRepository } from "../IChatsRepository";
import { ChatModel } from "@modules/Chat/infra/persistence/models/Chat";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { JoinChatDTO } from "@modules/Chat/dtos/JoinChatDTO";

interface UserChat {
  chat_id: string;
  user_id: string;
}

class ChatsRepositoryInMemory implements IChatsRepository {
  private chats: ChatModel[];
  private usersInChat: UserChat[];
  constructor() {
    this.chats = [];
    this.usersInChat = [];
  }
  async update(data: JoinChatDTO): Promise<string | ChatModel> {
    const foundUser = this.usersInChat.filter(
      (chat) => chat.chat_id === data.chat_id && chat.user_id === data.user_id
    );
    if (foundUser.length > 0) {
      return "This user already associated with this chat room";
    } else {
      this.usersInChat.push({
        chat_id: data.chat_id,
        user_id: data.chat_id,
      });
      const chat = this.chats.find((chat) => chat.id === data.chat_id);
      return chat as ChatModel;
    }
  }

  async getUsersByChatId(chat_id: string): Promise<number> {
    const chats = this.usersInChat.filter((chat) => chat.chat_id === chat_id);
    return chats.length;
  }
  async findByName(
    name: string
  ): Promise<Either<ChatNotFoundException, ChatModel>> {
    const chat = this.chats.find((chat) => chat.name === name);
    if (!chat) {
      return left(new ChatNotFoundException());
    }
    return right(chat);
  }
  async findById(
    id: string
  ): Promise<Either<ChatNotFoundException, ChatModel>> {
    const chat = this.chats.find((chat) => chat.id === id);
    if (!chat) {
      return left(new ChatNotFoundException());
    }
    return right(chat);
  }
  async create(data: CreateChatDTO): Promise<ChatModel> {
    const newChat = new ChatModel({
      ...data,
      id: uuidV4(),
      owner_id: data.user.id,
      created_at: new Date(),
    });
    Object.assign(newChat, data);
    this.chats.push(newChat);
    this.usersInChat.push({
      chat_id: newChat.id,
      user_id: newChat.owner_id,
    });
    return newChat;
  }
  async list(): Promise<ChatModel[]> {
    const chats = this.chats;
    return chats;
  }
}

export { ChatsRepositoryInMemory };
