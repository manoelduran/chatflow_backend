import { AuthController } from "@modules/User/infra/http/controllers/AuthController";
import { UserController } from "@modules/User/infra/http/controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const userRoutes = Router();
const authController = new AuthController()

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

  userRoutes.post("/auth", celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required()
    },
  }),
  authController.auth
  );
  userRoutes.post("/show/:user_id",(req, res, next) => ensureAuthenticated(req, res, next), celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  userController.show
  );
userRoutes.get("/", userController.list)

export { userRoutes }