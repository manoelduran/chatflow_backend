import { Address } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

class AddressModel implements Address {
  id: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
  created_at: Date;
  constructor(props: Address) {
    if (!this.id) {
      this.id = uuidV4();
      Object.assign(this, props);
    }
  }
}

export { AddressModel };
