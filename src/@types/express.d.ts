declare namespace Express {
    export interface Request {
        user: {
            id: string;
            owner_id: string;
            username: string;
            email: string;
        };
        io: any;
        connectedUsers: {
          [key: string]: string;
        };
    }
}