import { Message } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';

class MessageModel implements Message {
    id!: string;
    text: string;
    chatId: string;
    userId: string;
    sentAt: Date;
    constructor(props: Message) {
        if (!this.id) {
            this.id = uuidV4();
            Object.assign(this, props)
        }
    }
};

export { MessageModel };