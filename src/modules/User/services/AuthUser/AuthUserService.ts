import { AuthUserDTO } from "@modules/User/dtos/AuthUserDTO";
import { PasswordNeedsToBeEqualException } from "@modules/User/exceptions/PasswordNeedsToBeEqualException";
import { UserMapper } from "@modules/User/mapper/UserMapper";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { AuthUserResponse } from "@modules/User/responses/AuthUserResponse";
import { IHashProvider } from "@shared/container/providers/HashProvider/models/IHashProvider";
import { left, right } from "@shared/either";
import jwt from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";

@injectable()
class AuthUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    async execute(data: AuthUserDTO): AuthUserResponse {
        const userOrError = await this.usersRepository.findByEmail(data.email)
   
        if(userOrError.isLeft()) {
            return left(userOrError.value)
        }

        const comparedPassword = await this.hashProvider.compareHash(data.password, userOrError.value.password);
        if(!comparedPassword) {
            return left(new PasswordNeedsToBeEqualException())
        }
    
        const {id, username, email} = userOrError.value;
        const parsedToken = {
            owner_id: id,
            username: username,
            email: email
        }
        const secret = process.env.JWT_SECRET || 'default';
        const token =  jwt.sign(parsedToken, secret, {
            expiresIn: '1d'
        })
        const refreshToken = jwt.sign(parsedToken, secret, {
            expiresIn: '2d'
        });
        return right({user: UserMapper.toPresenter(userOrError.value), token, refreshToken})
    }
}

export {AuthUserService}