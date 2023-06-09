import { Either } from '@shared/either';
import { ChatAlreadyExistsException } from '@modules/Chat/exceptions/ChatAlreadyExistsException';
import { ChatModel } from '../infra/persistence/models/Chat';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';



export type CreateChatResponse = Promise<
  Either<
  ChatAlreadyExistsException | UserNotFoundException,
    ChatModel
  >
>;
