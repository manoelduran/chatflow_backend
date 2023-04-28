import { Router } from "express";
import { chatRoutes } from "./chats.routes";


const router = Router();

router.use("/chats", chatRoutes);

export { router }