import { Chat } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';

class ChatModel implements Chat {
    id!: string;
    name: string;
    owner_id: string;
    created_at: Date;
    constructor(props: Chat) {
        if (!this.id) {
            this.id = uuidV4();
            Object.assign(this, props)
        }
    }
};

export { ChatModel };