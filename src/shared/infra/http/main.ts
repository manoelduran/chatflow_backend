import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import express, { Express as Application } from 'express';
import { createServer, Server as HttpServer } from "http";
import {Server} from 'socket.io';
import { router } from '../../routes';

class Main {
    public app: Application;
    public server: HttpServer
    public io:  Server
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = new Server(this.server, {
            maxHttpBufferSize: 1e8,
            pingTimeout: 200000,
            path: 'api/socket'
        })

    }
    public async init(): Promise<void> {
        this.middlewares()
        this.routes()
        this.socketIo()
    }
    private middlewares() {
        this.app.set("trust proxy", 1);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static("public"));

    }
    private socketIo():void {
        this.io.on('connection', (socket) => {
            console.log('a user connected', socket.id);
          });
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