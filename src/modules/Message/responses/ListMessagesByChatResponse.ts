import { ChatNotFoundException } from '@modules/Chat/exceptions/ChatNotFoundException';
import { MessageModel } from '@modules/Message/infra/persistence/models/Message';
import { Either } from '@shared/either';



export type ListMessagesByChatResponse = Promise<Either<ChatNotFoundException,MessageModel[]>>;
