interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    created_at?: Date;
}

export { CreateUserDTO }