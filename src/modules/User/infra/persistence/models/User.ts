
import { User } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';

class UserModel implements User {
    id!: string;
    email:  string;
    username: string;
    password: string;
    created_at: Date;
    constructor(props: User) {
        if (!this.id) {
            this.id = uuidV4();
            this.email = props.email
            this.username = props.username
            this.password = props.password
            this.created_at = props.created_at
        }
    }
};

export { UserModel };