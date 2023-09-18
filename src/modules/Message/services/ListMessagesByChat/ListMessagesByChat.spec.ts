import "reflect-metadata";
import { ChatsRepositoryInMemory } from "@modules/Chat/repositories/in-memory/ChatsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/User/repositories/in-memory/UsersRepositoryInMemory";
import { MessagesRepositoryInMemory } from "@modules/Message/repositories/in-memory/MessagesRepositoryInMemory";
import { ListMessagesByChatService } from "./ListMessagesByChatService";
import { MessageModel } from "@modules/Message/infra/persistence/models/Message";
import { randomUUID } from "crypto";
import { MessageNotFoundException } from "@modules/Message/exceptions/MessageNotFoundException";

let chatsRepositoryInMemory: ChatsRepositoryInMemory;
let messagesRepositoryInMemory: MessagesRepositoryInMemory;
let listMessageByChatService: ListMessagesByChatService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("List Messages By Chat", () => {
  beforeAll(() => {
    chatsRepositoryInMemory = new ChatsRepositoryInMemory();
    messagesRepositoryInMemory = new MessagesRepositoryInMemory();

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listMessageByChatService = new ListMessagesByChatService(
      messagesRepositoryInMemory,
      chatsRepositoryInMemory,
      usersRepositoryInMemory
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
    const messageResult = await listMessageByChatService.execute({
      chat_id: newMessage2.chat_id,
    });
    expect(messageResult.value).toHaveLength(2);
  });
  it("Should  be able to get all messages by chat id", async () => {
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
    const messages = await messagesRepositoryInMemory.findAllByChat(
      newMessage2.chat_id
    );
    if (messages.isLeft()) {
      return messages.value;
    }
    messages.value.forEach((item: MessageModel) => {
      expect(item).toBeInstanceOf(MessageModel);
    });
  });
  it("Should  not be able to get message by id", async () => {
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
    const id = randomUUID();
    const messages = await messagesRepositoryInMemory.findById(id);

    expect(messages.value).toStrictEqual(new MessageNotFoundException());
  });
  it("Should  not be able to get all messages by chat id", async () => {
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
    const id = randomUUID();
    const messages = await messagesRepositoryInMemory.findAllByChat(id);

    expect(messages.value).toStrictEqual(new MessageNotFoundException());
  });
  it("Should be able to get all messages by chat id and user id", async () => {
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
    const resultNewMessage2 = await messagesRepositoryInMemory.create(
      newMessage2
    );
    const messages = await messagesRepositoryInMemory.findAllUserMessagesInChat(
      resultNewMessage2.chatId,
      resultNewMessage2.userId
    );
    if (messages.isLeft()) {
      return messages.value;
    }
    messages.value.forEach((item: MessageModel) => {
      expect(item).toBeInstanceOf(MessageModel);
    });
  });
});
it("Should not be able to get all messages by chat id and user id", async () => {
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
  const fakeData = {
    chatId: randomUUID(),
    userId: randomUUID(),
  };
  const messages = await messagesRepositoryInMemory.findAllUserMessagesInChat(
    fakeData.chatId,
    fakeData.userId
  );
  expect(messages.value).toStrictEqual(new MessageNotFoundException());
});

it("Should not be able to get all messages by chat id and user id", async () => {
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
  const newMessage2Result = await messagesRepositoryInMemory.create(
    newMessage2
  );
  const messages = await messagesRepositoryInMemory.findAllByUser(
    newMessage2Result.userId
  );
  if (messages.isLeft()) {
    return messages.value;
  }
  messages.value.forEach((item: MessageModel) => {
    expect(item).toBeInstanceOf(MessageModel);
  });
});
it("Should not be able to get all messages by  user id", async () => {
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
  const fakeData = {
    chat_id: randomUUID(),
    user_id: randomUUID(),
  };
  const messages = await messagesRepositoryInMemory.findAllByUser(
    fakeData.user_id
  );
  if (messages.isLeft()) {
    return messages.value;
  }
  expect(messages.value).toStrictEqual(new MessageNotFoundException());
});
it("Should be able to get message by  name", async () => {
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
  const newMessage2Result = await messagesRepositoryInMemory.create(
    newMessage2
  );
  const messages = await messagesRepositoryInMemory.findByName(
    newMessage2Result.text
  );
  if (messages.isLeft()) {
    return messages.value;
  }
  expect(messages.value).toBeInstanceOf(MessageModel);
});
it("Should not be able to get message by name", async () => {
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
  const fakeMessage = {
    text: "Hello",
  };
  const messages = await messagesRepositoryInMemory.findByName(
    fakeMessage.text
  );
  if (messages.isLeft()) {
    return messages.value;
  }
  expect(messages.value).toStrictEqual(new MessageNotFoundException());
});
