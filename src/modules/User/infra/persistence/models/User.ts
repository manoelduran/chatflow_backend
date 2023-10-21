import { User } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

class UserModel implements User {
  id: string;
  email: string;
  username: string;
  password: string;
  card_token?: string;
  customer_id?: string;
  addressId?: string;
  isPremium: boolean;
  created_at: Date;
  constructor(props: User) {
    if (!this.id) {
      this.id = uuidV4();
      Object.assign(this, props);
    }
  }
}

export { UserModel };
