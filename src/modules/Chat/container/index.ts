import { container } from "tsyringe";
import { ChatsRepository } from "@modules/Chat/infra/persistence/repositories/ChatsRepository";
import { IChatsRepository } from "@modules/Chat/repositories/IChatsRepository";



container.registerSingleton<IChatsRepository>(
    "ChatsRepository",
    ChatsRepository
)