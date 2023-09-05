import { UserModel } from "@modules/User/infra/persistence/models/User";

interface CreateChatDTO {
    name: string;
    user?: UserModel;
    owner_id?: string;
    created_at?: string;
    user_id?: string;
}

export { CreateChatDTO }