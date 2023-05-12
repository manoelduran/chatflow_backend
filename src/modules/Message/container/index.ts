import { container } from "tsyringe";
import { IMessagesRepository } from "../repositories/IMessagesRepository";
import { MessagesRepository } from "../infra/persistence/repositories/MessagesRepository";



container.registerSingleton<IMessagesRepository>(
    "MessagesRepository",
    MessagesRepository
)