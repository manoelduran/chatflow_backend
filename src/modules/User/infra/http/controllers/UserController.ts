

import { Request, Response } from 'express';
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { left, right } from "@shared/either";
import { ListUsersResponse } from '@modules/User/responses/ListUsersResponse';
import { CreateUserResponse } from '@modules/User/responses/CreateUserResponse';
import { CreateUserService } from '@modules/User/services/CreateUser/CreateUserService';
import { ListUsersService } from '@modules/User/services/ListUsers/ListUsersService';

export class UserController  {

    public async list(request: Request, response: Response): Promise<Response> {
        const listUsersService = container.resolve<Service<any, ListUsersResponse>>(ListUsersService);

        const users = await listUsersService.execute();

        return response.status(200).json(instanceToInstance(users));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createUserservice = container.resolve<Service<any, CreateUserResponse>>(CreateUserService);

        const userOrError = await createUserservice.execute({
            ...body,
        });
        if (userOrError.isLeft()) {
           return response.status(400).json(left(userOrError.value))
        };
        return response.status(201).json(right(instanceToInstance(userOrError.value)));
    };
}