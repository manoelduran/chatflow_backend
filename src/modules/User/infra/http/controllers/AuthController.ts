import { AuthUserDTO } from '@modules/User/dtos/AuthUserDTO';
import { AuthUserResponse } from '@modules/User/responses/AuthUserResponse';
import { AuthUserService } from '@modules/User/services/AuthUser/AuthUserService';
import { Service } from '@shared/domain/Service';
import { left, right } from '@shared/either';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AuthController {
    public async auth(request: Request, response: Response): Promise<Response> {
        const { body } = request;
    
        const authUserservice = container.resolve<Service<AuthUserDTO, AuthUserResponse>>(AuthUserService);

        const userOrError = await authUserservice.execute({
            ...body,
        });
        if (userOrError.isLeft()) {
           return response.status(400).json(left(userOrError.value))
        };
        return response.status(201).json(right(instanceToInstance(userOrError.value)));
    };
}

export {AuthController}