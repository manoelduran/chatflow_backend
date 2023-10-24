import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { CreateAddressService } from "./CreateAddressService";
import { BCryptHashProvider } from "@shared/container/providers/HashProvider/implementations/BCryptHashProvider";
import { UserAlreadyExistsException } from "@modules/User/exceptions/UserAlreadyExistsException";

let createAddressService: CreateAddressService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let bCryptHashProvider: BCryptHashProvider;

describe("Create User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    bCryptHashProvider = new BCryptHashProvider();
    createAddressService = new CreateAddressService(
      usersRepositoryInMemory,
      bCryptHashProvider
    );
  });
  it("Should be able to create a user", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };

    const result = await createUserService.execute(user);

    expect(result.value).toHaveProperty("id");
  });
  it("Should not be able to create a user that already exists", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };

    await createUserService.execute(user);

    const user2 = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };

    const reslut = await createUserService.execute(user2);

    expect(reslut.value).toEqual(new UserAlreadyExistsException());
  });
});
