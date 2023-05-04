import { IHashProvider } from "@shared/container/providers/HashProvider/models/IHashProvider";
import { compare, hash } from "bcrypt";



class BCryptHashProvider implements IHashProvider {
    async generateHash(password: string): Promise<string> {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }
    async compareHash(password: string, hashedPassword: string): Promise<boolean> {
        const isEqual = await compare(password, hashedPassword)
        return isEqual
    }

}

export { BCryptHashProvider }