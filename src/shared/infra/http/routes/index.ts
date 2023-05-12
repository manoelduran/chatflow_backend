import { Router } from "express";
import { chatRoutes } from "./chats.routes";
import { userRoutes } from "./users.routes";
import { messageRoutes } from "./messages.routes";


const router = Router();

router.use("/chats", chatRoutes);
router.use("/users", userRoutes);
router.use("/messages", messageRoutes);

export { router }