import { ChatController } from "@modules/Chat/infra/http/controllers/ChatController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";


const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.post("/:user_id", celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  chatController.create
  );

  chatRoutes.post("/join/:chat_id", celebrate({
    [Segments.PARAMS]: {
      chat_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  chatController.join
  );

chatRoutes.get("/", chatController.list)

export { chatRoutes }