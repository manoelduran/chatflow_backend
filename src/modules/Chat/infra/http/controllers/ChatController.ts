
import { ListChatsResponse } from "@modules/Chat/responses/ListChatsResponse";
import { Request, Response } from 'express';
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { CreateChatResponse } from "@modules/Chat/responses/CreateChatResponse";
import { CreateChatService } from "@modules/Chat/services/CreateChat/CreateChatService";
import { ListChatsService } from "@modules/Chat/services/ListChats/ListChatsService";
import { left, right } from "@shared/either";
import { UpdateChatResponse } from "@modules/Chat/responses/UpdateChatResponse";
import { JoinChatService } from "@modules/Chat/services/JoinChat/JoinChatService";
import { JoinChatDTO } from "@modules/Chat/dtos/JoinChatDTO";
import { CreateChatDTO } from "@modules/Chat/dtos/CreateChatDTO";
import { GetChatDTO } from "@modules/Chat/dtos/GetChatDTO";
import { GetChatResponse } from "@modules/Chat/responses/GetChatResponse";
import { GetChatService } from "@modules/Chat/services/GetChat/GetChatService";

export class ChatController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listChatsService = container.resolve<Service<any, ListChatsResponse>>(ListChatsService);

        const chats = await listChatsService.execute();
        return response.status(200).json(instanceToInstance(chats));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body, user } = request;
        const createChatService = container.resolve<Service<CreateChatDTO, CreateChatResponse>>(CreateChatService);
        
        const chatOrError = await createChatService.execute({
            ...body,
            user_id: user.owner_id
        });

        if (chatOrError.isLeft()) {
            return response.status(400).json(left(chatOrError.value))
        };
        return response.status(201).json(right(instanceToInstance(chatOrError.value)));
    };
    public async join(request: Request, response: Response): Promise<Response> {
        const { user } = request;
        const { chat_id } = request.params;
        const joinChatService = container.resolve<Service<JoinChatDTO, UpdateChatResponse>>(JoinChatService);

        const chatOrError = await joinChatService.execute({
            chat_id,
            user_id: user.owner_id
        });
        if (chatOrError.isLeft()) {
            return response.status(400).json(left(chatOrError.value))
        };

        return response.status(201).json(right(instanceToInstance(chatOrError.value)));
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { params } = request;
        const getChatervice = container.resolve<Service<GetChatDTO, GetChatResponse>>(GetChatService);

        const chatOrError = await getChatervice.execute({chat_id: params.chat_id});
        if (chatOrError.isLeft()) {
            return response.status(400).json(left(chatOrError.value))
         };

        return response.status(200).json(instanceToInstance(chatOrError.value));
    };
}