import { Either } from '@shared/either';
import { ChatModel } from '../infra/persistence/models/Chat';
import { ChatNotFoundException } from '../exceptions/ChatNotFoundException';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';



export type UpdateChatResponse = Promise<
  Either<
  ChatNotFoundException | UserNotFoundException,
  ChatModel
  >
>;
