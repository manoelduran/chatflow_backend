import { Chat } from "@prisma/client";

class ChatModel implements Chat {
    id: string;
    name: string;
    created_at: Date;
    constructor(props: Chat) {
        this.id = props.id
        this.name = props.name
        this.created_at = props.created_at
    }
};

export { ChatModel };