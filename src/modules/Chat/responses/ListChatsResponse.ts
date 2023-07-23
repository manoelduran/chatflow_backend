import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';
import { ChatModel } from '../infra/persistence/models/Chat';
import { Either } from '@shared/either';

export interface ChatWithTotalUsers {
    chat: ChatModel,
    totalUsers: number,
    owner: string
}

export type ListChatsResponse = Promise<Either<UserNotFoundException,ChatWithTotalUsers[]>>;
