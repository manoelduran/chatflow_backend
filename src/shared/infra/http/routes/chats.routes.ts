import { ChatController } from "@modules/Chat/infra/http/controllers/ChatController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";


const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post("/", celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  chatController.create
  );

chatRoutes.get("/", chatController.list)

export { chatRoutes }