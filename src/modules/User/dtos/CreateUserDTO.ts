interface CreateUserDTO {
  username: string;
  email: string;
  customer_id?: string;
  isPremium?: boolean;
  password: string;
  created_at?: Date;
}

export { CreateUserDTO };
