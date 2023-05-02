

import { prisma } from "@shared/infra/orm/prisma";
import { Either, left, right } from "@shared/either";
import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserModel } from "@modules/User/infra/persistence/models/User";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {
    private ormRepository: PrismaClient
    constructor() {
        this.ormRepository = prisma
    }
    async create(data: CreateUserDTO): Promise<UserModel> {
        const user = await this.ormRepository.user.create({data});
        return user;
      }
      async list(): Promise<UserModel[]> {
        const users = await this.ormRepository.user.findMany();
        return users;
      }
      async findByData(username: string, email: string): Promise<Either<UserNotFoundException, UserModel>> {
        const userOrError = await this.ormRepository.user.findUnique({
            where: {
                email, username
            },
        });
        if(!userOrError) {
            return left(new UserNotFoundException())
        }
        return right(userOrError);
    }
      async findById(id: string): Promise<Either<UserNotFoundException, UserModel>> {
        const userOrError = await this.ormRepository.user.findUnique({
            where: {
                id,
            },
        });
        if(!userOrError) {
            return left(new UserNotFoundException())
        }
        return right(userOrError);
      }
};

export { UsersRepository };