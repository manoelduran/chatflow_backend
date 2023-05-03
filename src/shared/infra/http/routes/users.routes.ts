import { UserController } from "@modules/User/infra/http/controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";


const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    },
  }),
  userController.create
  );

userRoutes.get("/", userController.list)

export { userRoutes }