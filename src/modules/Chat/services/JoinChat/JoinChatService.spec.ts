import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { JoinChatService } from "./JoinChatService";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { CreateChatService } from "../CreateChat/CreateChatService";
import { left } from "@shared/either";
import { ChatModel } from "@modules/Chat/infra/persistence/models/Chat";
import { randomUUID } from "crypto";
import { UserNotFoundException } from "@modules/User/exceptions/UserNotFoundException";
import { ChatNotFoundException } from "@modules/Chat/exceptions/ChatNotFoundException";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let joinChatService: JoinChatService;
let createChatService: CreateChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Join Chat", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createChatService = new CreateChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
    joinChatService = new JoinChatService(
      chatsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });
  it("Should be able to join into a Chat", async () => {
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
    if (result.isLeft()) {
      return left(result.value);
    }
    const user2 = {
      email: "manoel.duran2@hotmail.com",
      username: "manoelduran2",
      password: "123456",
    };
    await usersRepositoryInMemory.create(user2);
    const user3 = {
      email: "manoel.duran233@hotmail.com",
      username: "manoelduran233",
      password: "123456",
    };
    const resultUser3 = await usersRepositoryInMemory.create(user3);

    const result3 = await joinChatService.execute({
      chat_id: result.value.id,
      user_id: resultUser3.id,
    });
    expect(result3.value).toBeInstanceOf(ChatModel);
  });
  it("Should not be able to join into a chat when the user already associated to this chat", async () => {
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
    if (result.isLeft()) {
      return left(result.value);
    }
    const user2 = {
      email: "manoel.duran2@hotmail.com",
      username: "manoelduran2",
      password: "123456",
    };
    const resultUser2 = await usersRepositoryInMemory.create(user2);
    console.log("resultUser2", resultUser2);
    const user3 = {
      email: "manoel.duran233@hotmail.com",
      username: "manoelduran233",
      password: "123456",
    };
    const resultUser3 = await usersRepositoryInMemory.create(user3);
    const result3 = await joinChatService.execute({
      chat_id: result.value.id,
      user_id: resultUser3.id,
    });
    if (result3.isLeft()) {
      return left(result3.value);
    }
    const result4 = await joinChatService.execute({
      chat_id: result.value.id,
      user_id: resultUser3.id,
    });
    console.log("result4", result4);
    expect(result4.value).toBeInstanceOf(ChatModel);
  });
  it("Should not be able to join into a chat when the user not exists", async () => {
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
    if (result.isLeft()) {
      return left(result.value);
    }

    const result3 = await joinChatService.execute({
      chat_id: result.value.id,
      user_id: randomUUID(),
    });
    expect(left(result3.value)).toBeInstanceOf(UserNotFoundException);
  });
  it("Should not be able to join into a chat when the user not exists", async () => {
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
    if (result.isLeft()) {
      return left(result.value);
    }
    const user2 = {
      email: "manoel.duran2@hotmail.com",
      username: "manoelduran2",
      password: "123456",
    };
    const resultUser2 = await usersRepositoryInMemory.create(user2);
    const result3 = await joinChatService.execute({
      chat_id: randomUUID(),
      user_id: resultUser2.id,
    });
    expect(left(result3.value)).toBeInstanceOf(ChatNotFoundException);
  });
});
