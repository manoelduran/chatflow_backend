

import { Request, Response } from 'express';
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { left, right } from "@shared/either";
import { ListUsersResponse } from '@modules/User/responses/ListUsersResponse';
import { CreateUserResponse } from '@modules/User/responses/CreateUserResponse';

export class UserController  {

    public async list(request: Request, response: Response): Promise<Response> {
        const listUsersService = container.resolve<Service<any, ListUsersResponse>>(ListUsersService);

        const users = await listUsersService.execute();

        return response.status(200).json(instanceToInstance(users));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createUserservice = container.resolve<Service<any, CreateUserResponse>>(CreateUserservice);

        const chatOrError = await createUserservice.execute({
            ...body,
        });
        if (chatOrError.isLeft()) {
           return response.status(400).json(left(chatOrError.value))
        };
   
        return response.status(201).json(right(instanceToInstance(chatOrError.value)));
    };
}