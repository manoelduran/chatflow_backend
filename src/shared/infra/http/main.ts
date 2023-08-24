import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import express, { Express as Application } from 'express';
import { createServer, Server as HttpServer } from "http";
import socketio from 'socket.io';
import { router } from '@shared/infra/http/routes';
import cors from 'cors';
import '@shared/container';
import { errors } from 'celebrate';
import { httpExceptionHandler } from './middlewares/httpExceptionHandler';
import { listen } from '../../../socket';

interface ConnectedUsers {
    [key: string]: string;
}
class Main {
    private connectedUsers: ConnectedUsers = {};
    private allowedOrigins: string[] = [
        'http://localhost:3000',
        'https://chatflow-ten.vercel.app',
        'https://chatflow-manoelduran.vercel.app/',
        'https://chatflow-git-main-manoelduran.vercel.app/'
    ];
    public app: Application;
    public server: HttpServer
    public io: socketio.Server
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = new socketio.Server(this.server, {
            maxHttpBufferSize: 1e8,
            pingTimeout: 200000,
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
            path: '/apiws/socket.io'
        })

    }
    public async init(): Promise<void> {
        this.middlewares()
        this.routes()
        this.socketIo()
        this.exceptionHandler()
    }
    private middlewares() {
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            req.io = this.io;
            req.connectedUsers = this.connectedUsers;
            return next();
        });

        this.app.use(
            cors({
                origin: (origin, callback) => {
                    if (!origin) return callback(null, true);

                    if (this.allowedOrigins.indexOf(origin) === -1) {
                        const message = `A política CORS para este site não permite acesso da Origem ${origin}.`;

                        return callback(new Error(message), false);
                    }

                    return callback(null, true);
                },
                credentials: true,
            }),
        );
    }
    private exceptionHandler(): void {
        this.app.use(errors());
        this.app.use(httpExceptionHandler.handle);
    }
    private socketIo(): void {
        listen(this.io)
    }
    private routes(): void {
        this.app.use(router);
    }
    public listen(): void {
        this.server.listen(process.env.PORT || 3333, () => {
            console.log(
                `--- Server started on port ${process.env.PORT || 3333} 🚀---`
            );
        });
    }

}
export const main = new Main()