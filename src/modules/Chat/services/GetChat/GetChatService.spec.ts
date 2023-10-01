import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { GetChatService } from "./GetChatService";
import { CreateChatService } from "../CreateChat/CreateChatService";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";
import { randomUUID } from "crypto";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let createChatService: CreateChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let getChatService: GetChatService;

describe("Get Chat", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createChatService = new CreateChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
    getChatService = new GetChatService(chatsRepositoryInMemory);
  });
  it("Should be able to findOne Chat", async () => {
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
    await createChatService.execute(newChat);
    const chats = await chatsRepositoryInMemory.list();
    const result = await getChatService.execute({ chat_id: chats[0].id });

    expect(result.value).toHaveProperty("id");
  });
  it("Should not be able to findOne Chat", async () => {
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
    await createChatService.execute(newChat);
    await chatsRepositoryInMemory.list();
    const result = await getChatService.execute({ chat_id: randomUUID() });

    expect(result.value).toEqual(new ChatNotFoundException());
  });
});
