import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { MessagesRepositoryInMemory } from "@modules/Message/repositories/in-memory/MessagesRepositoryInMemory";
import { CreateMessageService } from "./CreateMessageService";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let messagesRepositoryInMemory: MessagesRepositoryInMemory;
let createMessageService: CreateMessageService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create Message", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    messagesRepositoryInMemory = new MessagesRepositoryInMemory();

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createMessageService = new CreateMessageService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory,
      messagesRepositoryInMemory
    );
  });
  it("Should be able to create a message", async () => {
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

    const result = await chatsRepositoryInMemory.create(newChat);
    const newMessage = {
      chat_id: result.id,
      text: "Olá",
      user_id: result.owner_id,
    };
    const messageResult = await createMessageService.execute({
      chat_id: newMessage.chat_id,
      text: newMessage.text,
      user_id: newMessage.user_id,
    });
    if (messageResult.isLeft()) {
      return messageResult.value;
    }
    expect(messageResult.value).toHaveProperty("id");
  });
});
