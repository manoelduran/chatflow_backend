import { MessageModel } from '@modules/Message/infra/persistence/models/Message';



export type ListMessagesResponse = Promise<MessageModel[]>;
