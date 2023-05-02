import { Either } from "@shared/either";
import { CreateUserDTO } from "@modules/User/dtos/CreateUserDTO";
import { UserModel } from "@modules/User/infra/persistence/models/User";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";


interface IUsersRepository {
    create(data: CreateUserDTO): Promise<UserModel>;
    findById(id: string): Promise<Either<UserNotFoundException, UserModel>>;
    findByData(username: string, email: string): Promise<Either<UserNotFoundException, UserModel>>
    list(): Promise<UserModel[]> ;
};

export { IUsersRepository };