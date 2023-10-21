import { Either } from "@shared/either";
import { CreateCustomerException } from "../../exceptions/Customer/CreateCustomerException";
import Stripe from "stripe";

export type CreateCustomerResponse = Promise<
  Either<CreateCustomerException, Stripe.Response<Stripe.Customer>>
>;
