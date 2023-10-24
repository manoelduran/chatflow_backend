import { Either } from "@shared/either";
import { FindAllCustomersException } from "../../exceptions/Customer/FindAllCustomersException";
import Stripe from "stripe";

export type FindAllCustomersResponse = Promise<
  Either<FindAllCustomersException, Stripe.ApiList<Stripe.Customer>>
>;
