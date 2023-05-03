
import { ListChatsResponse } from "@modules/Chat/responses/ListChatsResponse";
import { Request, Response } from 'express';
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { CreateChatService } from "@modules/Chat/services/CreateChat/CreateChatService";
import { ListChatsService } from "@modules/Chat/services/ListChats/ListChatsService";
import { left, right } from "@shared/either";
import { UpdateChatResponse } from "@modules/Chat/responses/UpdateChatResponse";
import { JoinChatService } from "@modules/Chat/services/JoinChat/JoinChatService";

export class ChatController  {

    public async list(request: Request, response: Response): Promise<Response> {
        const listChatsService = container.resolve<Service<any, ListChatsResponse>>(ListChatsService);

        const chats = await listChatsService.execute();

        return response.status(200).json(instanceToInstance(chats));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;
        const {params} = request;
        const createChatService = container.resolve<Service<any, CreateChatResponse>>(CreateChatService);

        const chatOrError = await createChatService.execute({
            ...body,
            params
        });
        if (chatOrError.isLeft()) {
           return response.status(400).json(left(chatOrError.value))
        };
   
        return response.status(201).json(right(instanceToInstance(chatOrError.value)));
    };
    public async join(request: Request, response: Response): Promise<Response> {
        const { body } = request;
        const { chat_id } = request.params;
        const joinChatService = container.resolve<Service<any, UpdateChatResponse>>(JoinChatService);

        const chatOrError = await joinChatService.execute({
            ...body,
            chat_id
        });
        if (chatOrError.isLeft()) {
           return response.status(400).json(left(chatOrError.value))
        };
   
        return response.status(201).json(right(instanceToInstance(chatOrError.value)));
    };
}