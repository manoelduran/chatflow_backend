import { prisma } from "@shared/infra/orm/prisma";
import { Either, left, right } from "@shared/either";
import { Prisma, PrismaClient } from "@prisma/client";
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
        const user = await this.ormRepository.user.create({ data });
        return user;
    }
    async list(): Promise<UserModel[]> {
        const users = await this.ormRepository.user.findMany();
        return users;
    }
    async findByWhere(username?: string, email?: string): Promise<Either<UserNotFoundException, UserModel | null>> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (!user) {
            return left(new UserNotFoundException())
        }
        return right(user)

    }
    async findByEmail(email: string): Promise<Either<UserNotFoundException, UserModel>> {
        const userOrError = await this.ormRepository.user.findUnique({
            where: {
                email,
            },
        });
        if (!userOrError) {
            return left(new UserNotFoundException())
        }
        return right(userOrError);
    }
    async findById(id: string): Promise<Either<UserNotFoundException, UserModel>> {
        const userOrError = await this.ormRepository.user.findFirst({
            where: {
                id,
            },
        });
        if (!userOrError) {
            return left(new UserNotFoundException())
        }
        return right(userOrError);
    }
};

export { UsersRepository };