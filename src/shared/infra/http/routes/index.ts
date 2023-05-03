import { Router } from "express";
import { chatRoutes } from "./chats.routes";
import { userRoutes } from "./users.routes";


const router = Router();

router.use("/chats", chatRoutes);
router.use("/users", userRoutes);

export { router }