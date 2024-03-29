import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";
import { CreateMessageDTO } from "@modules/Message/dtos/CreateMessageDTO";
import { IMessagesRepository } from "@modules/Message/repositories/IMessagesRepository";
import { CreateMessageResponse } from "@modules/Message/responses/CreateMessageResponse";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { left, right } from "@shared/either";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateMessageService {
  constructor(
    @inject("ChatsRepository")
    private chatsRepository: IChatsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}
  async execute(data: CreateMessageDTO): CreateMessageResponse {
    const userOrError = await this.usersRepository.findById(data.user_id);
    if (userOrError.isLeft()) {
      return left(new UserNotFoundException());
    }
    const chatAlreadyExists = await this.chatsRepository.findById(data.chat_id);
    if (chatAlreadyExists.isLeft()) {
      return left(new ChatNotFoundException());
    }
    const newMessage = await this.messagesRepository.create({
      chat_id: data.chat_id,
      text: data.text,
      user_id: data.user_id,
    });

    return right(newMessage);
  }
}

export { CreateMessageService };
