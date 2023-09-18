import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { GetUserService } from "./GetUserService";
import { CreateUserService } from "../CreateUser/CreateUserService";
import { BCryptHashProvider } from "@shared/container/providers/HashProvider/implementations/BCryptHashProvider";
import { left } from "@shared/either";
import { UserModel } from "@modules/User/infra/persistence/models/User";

let getUserService: GetUserService;
let createUserService: CreateUserService;
let bCryptHashProvider: BCryptHashProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Get User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    bCryptHashProvider = new BCryptHashProvider();
    createUserService = new CreateUserService(
      usersRepositoryInMemory,
      bCryptHashProvider
    );
    getUserService = new GetUserService(usersRepositoryInMemory);
  });
  it("Should be able to get a user", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);

    const result = await getUserService.execute({
      user_id: resultUser.id,
    });
    expect(result.value).toHaveProperty("id");
  });
  it("Should  be able to get a user by email", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);
    const foundUser = await usersRepositoryInMemory.findByEmail(
      resultUser.email
    );
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    expect(foundUser.value).toBeInstanceOf(UserModel);
  });
  it("Should  be able to get a user by data", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);
    const foundUser = await usersRepositoryInMemory.findByData(
      resultUser.username,
      resultUser.email
    );
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    expect(foundUser.value).toBeInstanceOf(UserModel);
  });
  it("Should  be able to get a user by id", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);
    const foundUser = await usersRepositoryInMemory.findById(resultUser.id);
    expect(foundUser.value).toBeInstanceOf(UserModel);
  });
  it("Should  be able to get a user by where", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);
    const foundUser = await usersRepositoryInMemory.findByWhere(resultUser.id);
    if (foundUser.isLeft()) {
      return left(foundUser.value);
    }
    expect(foundUser.value).toBeInstanceOf(UserModel);
  });
});
