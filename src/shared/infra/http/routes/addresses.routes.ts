import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { AddressController } from "@modules/Address/infra/http/controllers/AddressController";

const addressRoutes = Router();

const addressController = new AddressController();

addressRoutes.post(
  "/",
  (req, res, next) => ensureAuthenticated(req, res, next),
  celebrate({
    [Segments.BODY]: {
      city: Joi.string().required(),
      country: Joi.string().required(),
      line1: Joi.string().required(),
      postal_code: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  addressController.create
);

export { addressRoutes };
