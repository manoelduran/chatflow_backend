import { prisma } from "@shared/infra/orm/prisma";
import { Either, left, right } from "@shared/either";
import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserModel } from "@modules/User/infra/persistence/models/User";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { IUsersRepository } from "@modules/User/repositories/IUsersRepository";
import { UpdateUserDTO } from "@modules/User/dtos/UpdateUserDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: PrismaClient;
  constructor() {
    this.ormRepository = prisma;
  }

  async create(data: CreateUserDTO): Promise<UserModel> {
    const user = await this.ormRepository.user.create({ data });
    return user;
  }
  async update(
    data: UpdateUserDTO,
    customer_id: string
  ): Promise<Either<UserNotFoundException, UserModel>> {
    const foundUser = await this.findByWhere(customer_id);
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    const user = await this.ormRepository.user.update({
      where: { id: foundUser.value.id },
      data: data,
    });
    console.log("user", user);
    return right(user);
  }
  async list(): Promise<UserModel[]> {
    const users = await this.ormRepository.user.findMany();
    return users;
  }
  async findByWhere(
    username?: string,
    email?: string,
    customer_id?: string
  ): Promise<Either<UserNotFoundException, UserModel | null>> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { customer_id }],
      },
    });
    if (!user) {
      return left(new UserNotFoundException());
    }
    return right(user);
  }
  async findByEmail(
    email: string
  ): Promise<Either<UserNotFoundException, UserModel>> {
    const userOrError = await this.ormRepository.user.findUnique({
      where: {
        email,
      },
    });
    if (!userOrError) {
      return left(new UserNotFoundException());
    }
    return right(userOrError);
  }
  async findById(
    id: string
  ): Promise<Either<UserNotFoundException, UserModel>> {
    const userOrError = await this.ormRepository.user.findFirst({
      where: {
        id,
      },
    });
    if (!userOrError) {
      return left(new UserNotFoundException());
    }
    return right(userOrError);
  }
}

export { UsersRepository };
