import { Either } from "@shared/either";
import { CreateCustomerException } from "../../exceptions/Customer/CreateCustomerException";
import Stripe from "stripe";

export type PutBillingAddressResponse = Promise<
  Either<CreateCustomerException, Stripe.Response<Stripe.Address>>
>;
