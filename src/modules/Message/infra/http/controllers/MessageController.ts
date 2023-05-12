import { Request, Response } from 'express';
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { left, right } from "@shared/either";
import { CreateMessageResponse } from '@modules/Message/responses/CreateMessageResponse';
import { CreateMessageService } from '@modules/Message/services/CreateMessage/CreateMessageService';
import { ListMessagesService } from '@modules/Message/services/ListMessages/ListMessagesService';
import { ListMessagesResponse } from '@modules/Message/responses/ListMessagesResponse';
import { CreateMessageDTO } from '@modules/Message/dtos/CreateMessageDTO';


export class MessageController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listMessagesService = container.resolve<Service<any, ListMessagesResponse>>(ListMessagesService);

        const messages = await listMessagesService.execute();

        return response.status(200).json(instanceToInstance(messages));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;
        const {params} = request
        const { user } = request;
        const createMessageService = container.resolve<Service<CreateMessageDTO, CreateMessageResponse>>(CreateMessageService);

        const messageOrError = await createMessageService.execute({
            ...body,
            chat_id: params.chat_id,
            user_id: user.owner_id
        });
        if (messageOrError.isLeft()) {
            return response.status(400).json(left(messageOrError.value))
        };

        return response.status(201).json(right(instanceToInstance(messageOrError.value)));
    };
}