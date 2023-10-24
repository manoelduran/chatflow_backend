import { UserModel } from '@modules/User/infra/persistence/models/User';



export type ListUsersResponse = Promise<UserModel[]>;
