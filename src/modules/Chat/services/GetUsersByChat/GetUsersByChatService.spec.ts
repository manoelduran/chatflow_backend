import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { GetUsersByChatService } from "./GetUsersByChatService";
import { CreateChatService } from "../CreateChat/CreateChatService";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let createChatService: CreateChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let getUsersByChatService: GetUsersByChatService;

describe("Get Users By Chat", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createChatService = new CreateChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
    getUsersByChatService = new GetUsersByChatService(chatsRepositoryInMemory);
  });
  it("Should be able to find all users by chat", async () => {
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
    const result = await getUsersByChatService.execute({
      chat_id: chats[0].id,
    });
    expect(typeof result).toBe("number");
  });
});
