import { Either } from "@shared/either";
import { FindOneCustomerException } from "../../exceptions/Customer/FindOneCustomerException";

export type FindOneCustomerResponse = Promise<
  Either<FindOneCustomerException, any>
>;
