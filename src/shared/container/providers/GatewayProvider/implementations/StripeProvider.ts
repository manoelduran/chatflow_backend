import Stripe from "stripe";
import { IGatewayProvider } from "../models/IGatewayProvider";
import { left, right } from "@shared/either";
import axios from "axios";
import { CreateCustomerResponse } from "../responses/Customer/CreateCustomerResponse";
import { FindAllCustomersResponse } from "../responses/Customer/FindAllCustomersResponse";
import { FindOneCustomerResponse } from "../responses/Customer/FindOneCustomerResponse";
import { CreateCustomerException } from "../exceptions/Customer/CreateCustomerException";

class StripeProvider implements IGatewayProvider {
  private stripeApi = axios.create({
    baseURL: "https://api.stripe.com",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${process.env.STRIPE_PRIVATE_KEY}`,
    },
  });

  public async createCustomer({
    email,
  }: Stripe.CustomerCreateParams): CreateCustomerResponse {
    try {
      console.log("entity", email);
      const newCustomer = await this.stripeApi.post("/v1/customers", {
        email,
      });
      console.log("newCustomer", newCustomer.data);
      return right(newCustomer.data);
    } catch (error) {
      console.log("ERRORR", error);
      return left(new CreateCustomerException());
      // Handle errors here, throw custom exceptions, etc.
    }
  }

  public async findAllCustomers({
    limit,
    expand,
  }: Stripe.CustomerListParams): FindAllCustomersResponse {
    try {
      const customers = await this.stripeApi.get("/v1/customers", {
        params: { limit, expand },
      });
      return customers.data;
    } catch (error) {
      console.log("ERRORR", error);
      // Handle errors here, throw custom exceptions, etc.
    }
  }

  public async findOneCustomer(
    { expand }: Stripe.CustomerRetrieveParams,
    customer_id: string
  ): FindOneCustomerResponse {
    try {
      const customer = await this.stripeApi.get(
        `/v1/customers/${customer_id}`,
        {
          params: { expand },
        }
      );
      return customer.data;
    } catch (error) {
      console.log("ERRORR", error);
      // Handle errors here, throw custom exceptions, etc.
    }
  }
}

export { StripeProvider };
