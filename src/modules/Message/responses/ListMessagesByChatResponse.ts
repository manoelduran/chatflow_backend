import { ChatNotFoundException } from '@modules/Chat/exceptions/ChatNotFoundException';
import { MessageModel } from '@modules/Message/infra/persistence/models/Message';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';
import { Either } from '@shared/either';

export interface MessageWithUser {
message: MessageModel,
owner: string
}

export type ListMessagesByChatResponse = Promise<Either<ChatNotFoundException | UserNotFoundException,MessageWithUser[]>>;
