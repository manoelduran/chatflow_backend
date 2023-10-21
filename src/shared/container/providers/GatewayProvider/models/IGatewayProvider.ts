import Stripe from "stripe";
import { CreateCustomerResponse } from "../responses/Customer/CreateCustomerResponse";
import { FindAllCustomersResponse } from "../responses/Customer/FindAllCustomersResponse";
import { FindOneCustomerResponse } from "../responses/Customer/FindOneCustomerResponse";

interface IGatewayProvider {
  createCustomer(entity: Stripe.CustomerCreateParams): CreateCustomerResponse;
  findAllCustomers(data: Stripe.CustomerListParams): FindAllCustomersResponse;
  findOneCustomer(
    data: Stripe.CustomerRetrieveParams,
    customer_id: string
  ): FindOneCustomerResponse;
}

export { IGatewayProvider };
