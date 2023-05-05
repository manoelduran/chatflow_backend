import { ChatModel } from "@modules/Chat/infra/persistence/models/Chat";
import { UserModel } from "@modules/User/infra/persistence/models/User";


interface CreateMessageDTO {
    text: string;
    chat?: ChatModel;
    chat_id: string;
    sentAt?: Date;
    user?: UserModel;
    user_id?: string;
}

export { CreateMessageDTO }