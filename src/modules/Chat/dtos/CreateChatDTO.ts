import { UserModel } from "@modules/User/infra/persistence/models/User";

interface CreateChatDTO {
    name: string;
    user?: UserModel;
    user_id?: string;
}

export { CreateChatDTO }