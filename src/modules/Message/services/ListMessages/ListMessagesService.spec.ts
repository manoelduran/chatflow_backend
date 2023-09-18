import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { MessagesRepositoryInMemory } from "@modules/Message/repositories/in-memory/MessagesRepositoryInMemory";
import { ListMessagesService } from "./ListMessagesService";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let messagesRepositoryInMemory: MessagesRepositoryInMemory;
let listMessagesMessageService: ListMessagesService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create Message", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    messagesRepositoryInMemory = new MessagesRepositoryInMemory();

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listMessagesMessageService = new ListMessagesService(
      messagesRepositoryInMemory
    );
  });
  it("Should be able to list messages", async () => {
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

    const resultChat = await chatsRepositoryInMemory.create(newChat);
    const newMessage = {
      chat_id: resultChat.id,
      text: "Olá",
      user_id: resultChat.owner_id,
    };
    await messagesRepositoryInMemory.create(newMessage);
    const newMessage2 = {
      chat_id: resultChat.id,
      text: "Tudo bem?",
      user_id: resultChat.owner_id,
    };
    await messagesRepositoryInMemory.create(newMessage2);
    const messageResult = await listMessagesMessageService.execute();
    expect(messageResult).toHaveLength(2);
  });
});
