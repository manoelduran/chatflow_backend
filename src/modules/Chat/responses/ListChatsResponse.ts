import { ChatModel } from '../infra/persistence/models/Chat';



export type ListChatsResponse = Promise<ChatModel[]>;
