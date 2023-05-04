import { Mapper } from "@shared/domain/Mapper";
import { UserModel } from "@modules/User/infra/persistence/models/User";


export class UserMapper implements Mapper<UserModel> {
    public static toPresenter({ password, ...data }: UserModel): any {

        return {
          ...data,
        };
      }
}