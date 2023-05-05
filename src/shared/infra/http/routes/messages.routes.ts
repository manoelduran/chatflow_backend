

import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { MessageController } from "@modules/Message/infra/http/controllers/MessageController";


const messageRoutes = Router();

const messageController = new MessageController();

messageRoutes.post("/", (req, res, next) => ensureAuthenticated(req, res, next), celebrate({
    [Segments.BODY]: {
      text: Joi.string().required(),
      chat_id: Joi.string().uuid(),
    },
  }),
  messageController.create
  );

messageRoutes.get("/",(req, res, next) => ensureAuthenticated(req, res, next), messageController.list)

export { messageRoutes }