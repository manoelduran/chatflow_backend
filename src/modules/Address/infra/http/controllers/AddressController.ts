import { Request, Response } from "express";
import { Service } from "@shared/domain/Service";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import { left, right } from "@shared/either";
import { CreateAddressService } from "@modules/Address/services/CreateAddress/CreateAddressService";
import { CreateAddressResponse } from "@modules/Address/responses/CreateAddressResponse";
import { CreateAddressDTO } from "@modules/Address/dtos/CreateAddressDTO";

export class AddressController {
  /*  public async list(request: Request, response: Response): Promise<Response> {
    const listUsersService =
      container.resolve<Service<any, ListUsersResponse>>(ListUsersService);

    const users = await listUsersService.execute();

    return response.status(200).json(instanceToInstance(users));
  }*/

  public async create(request: Request, response: Response): Promise<Response> {
    const { body, user } = request;
    const createAddressService =
      container.resolve<
        Service<CreateAddressDTO & { user_id: string }, CreateAddressResponse>
      >(CreateAddressService);

    const address = await createAddressService.execute({
      city: body.city,
      country: body.country,
      line1: body.line1,
      postal_code: body.postal_code,
      state: body.state,
      user_id: user.owner_id,
    });
    if (address.isLeft()) {
      return response.status(400).json(left(address.value));
    }
    return response.status(201).json(right(instanceToInstance(address.value)));
  }
}
