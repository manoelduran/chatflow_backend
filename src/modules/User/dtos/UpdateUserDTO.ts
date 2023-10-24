interface UpdateUserDTO {
  username: string;
  email: string;
  customer_id?: string;
  isPremium?: boolean;
  addressId?: string;
  password: string;
  updated_at?: Date;
}

export { UpdateUserDTO };
