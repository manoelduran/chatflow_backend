import { Either } from '@shared/either';

import { ChatNotFoundException } from '@modules/Chat/exceptions/ChatNotFoundException';
import { ChatModel } from '@modules/Chat/infra/persistence/models/Chat';



export type GetChatResponse  = Promise<
  Either<
  ChatNotFoundException,
    ChatModel
  >
>;
