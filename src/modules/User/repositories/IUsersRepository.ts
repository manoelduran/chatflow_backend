import { Either } from "@shared/either";
import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserModel } from "@modules/User/infra/persistence/models/User";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<UserModel>;
  findById(id: string): Promise<Either<UserNotFoundException, UserModel>>;
  findByEmail(
    email: string
  ): Promise<Either<UserNotFoundException, UserModel | null>>;
  findByWhere(
    username?: string,
    email?: string,
    customer_id?: string
  ): Promise<Either<UserNotFoundException, UserModel | null>>;
  update(
    data: UpdateUserDTO,
    customer_id?: string
  ): Promise<Either<UserNotFoundException, UserModel>>;
  list(): Promise<UserModel[]>;
}

export { IUsersRepository };
