import { container } from "tsyringe";
import { IGatewayProvider } from "./models/IGatewayProvider";
import { StripeProvider } from "./implementations/StripeProvider";

container.registerSingleton<IGatewayProvider>(
  "GatewayProvider",
  StripeProvider
);
