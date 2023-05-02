
import { Either, left, right } from '@shared/either';
import { v4 as uuidV4 } from 'uuid';
import { IUsersRepository } from '@modules/User/repositories/IUsersRepository';
import { UserModel } from '@modules/User/infra/persistence/models/User';
import { UserNotFoundException } from '@modules/User/exceptions/UserNotFoundException';
import { CreateUserDTO } from '@modules/User/dtos/CreateUserDTO';




class UsersRepositoryInMemory implements IUsersRepository {
    private users: UserModel[];
    constructor() {
        this.users = [];
    }
    async findByData(username: string, email: string): Promise<Either<UserNotFoundException, UserModel>> {
        const user = this.users.find(user => {
            user.username === username || user.email === email
        });
        if (!user) {
            return left(new UserNotFoundException());
        };
        return right(user);
    };
    async findById(id: string): Promise<Either<UserNotFoundException, UserModel>> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            return left(new UserNotFoundException());
        };
        return right(user);
    };
    async create(data: CreateUserDTO): Promise<UserModel> {
        const newUser = new UserModel({
            ...data,
            id: uuidV4(),
            created_at: new Date()
        });
        Object.assign(newUser, data);
        this.users.push(newUser);
        return newUser;
    };
    async list(): Promise<UserModel[]> {
        const users = this.users;
        return users;
    };

};

export { UsersRepositoryInMemory };