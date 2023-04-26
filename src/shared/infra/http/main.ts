import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import express, { Express as Application } from 'express';
import { createServer, Server as HttpServer } from "http";
import socketio from 'socket.io';
import { router } from '../../routes';
import {listen} from '../../../../socket';
import cors from 'cors';

class Main {
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
    }
    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

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