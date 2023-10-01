import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { ListChatsService } from "./ListChatsService";
import { CreateChatService } from "../CreateChat/CreateChatService";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let createChatService: CreateChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let listChatService: ListChatsService;

describe("List Chats", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createChatService = new CreateChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
    listChatService = new ListChatsService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });
  it("Should be able to find chats", async () => {
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
    const result = await listChatService.execute();

    expect(result.value).toHaveLength(1);
  });
});
