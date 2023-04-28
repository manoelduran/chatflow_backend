import { Either } from '@shared/either';
import { ChatAlreadyExistsException } from '@modules/Chat/exceptions/ChatAlreadyExistsException';
import { ChatModel } from '../infra/persistence/models/Chat';



export type CreateChatResponse = Promise<
  Either<
  ChatAlreadyExistsException,
    ChatModel
  >
>;
