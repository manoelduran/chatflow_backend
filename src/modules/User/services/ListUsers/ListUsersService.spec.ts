import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { ListUsersService } from "./ListUsersService";
import { CreateUserService } from "../CreateUser/CreateUserService";
import { BCryptHashProvider } from "@shared/container/providers/HashProvider/implementations/BCryptHashProvider";

let listUserService: ListUsersService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("List User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUserService = new ListUsersService(usersRepositoryInMemory);
  });
  it("Should be able to list users", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    await usersRepositoryInMemory.create(user);
    const user2 = {
      email: "manoel.duran2@hotmail.com",
      username: "manoelduran2",
      password: "123456",
    };
    await usersRepositoryInMemory.create(user2);
    const result = await listUserService.execute();
    expect(result).toHaveLength(2);
  });
});
