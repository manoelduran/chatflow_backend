import { Either } from '@shared/either';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';
import { MessageModel } from '../infra/persistence/models/Message';
import { ChatNotFoundException } from '@modules/Chat/exceptions/ChatNotFoundException';



export type CreateMessageResponse = Promise<
  Either<
  ChatNotFoundException | UserNotFoundException,
    MessageModel
  >
>;
