import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { CreateChatService } from "./CreateChatService";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { randomUUID } from "crypto";
import { ChatAlreadyExistsException } from "@modules/Chat/exceptions/ChatAlreadyExistsException";
import { UserModel } from "@modules/User/infra/persistence/models/User";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let createChatService: CreateChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create Chat", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createChatService = new CreateChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });
  it("Should be able to create a Chat", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);

    const newChat = {
      name: "Novo Chat",
      owner_id: resultUser.id,
      user: resultUser,
      user_id: resultUser.id,
    };

    const result = await createChatService.execute(newChat);

    expect(result.value).toHaveProperty("id");
  });
  it("Should not be able to create a Chat without an user", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };

    await usersRepositoryInMemory.create(user);

    const user2 = {
      id: randomUUID(),
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    } as UserModel;
    const newChat = {
      name: "Novo Chat 2",
      owner_id: user2.id,
      user: user2,
      user_id: user2.id,
    };
    const chatResult = await createChatService.execute(newChat);

    expect(chatResult.value).toEqual(new UserNotFoundException());
  });
  it("Should not be able to create a Chat with the same name", async () => {
    const user = {
      email: "manoel.duran@hotmail.com",
      username: "manoelduran",
      password: "123456",
    };
    const resultUser = await usersRepositoryInMemory.create(user);

    const newChat1 = {
      name: "Novo Chat",
      owner_id: resultUser.id,
      user: resultUser,
      user_id: resultUser.id,
    };
    await createChatService.execute(newChat1);
    const newChat2 = {
      name: "Novo Chat",
      owner_id: resultUser.id,
      user: resultUser,
      user_id: resultUser.id,
    };
    const result = await createChatService.execute(newChat2);

    expect(result.value).toEqual(new ChatAlreadyExistsException());
  });
});
