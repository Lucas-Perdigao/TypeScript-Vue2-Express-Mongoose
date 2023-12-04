import { IAuthService } from "../services/AuthServiceInterface";
import { Request, Response } from "express";
import { authSchemaValidator } from "../utils/validators/authSchemaValidator";
import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { IAuthController } from "./AuthControllerInterface";

export class AuthController implements IAuthController{
  constructor(private readonly service: IAuthService){}

  async login(req: Request, res: Response): Promise<void>  {
    try {
      const { body } = req;

      await authSchemaValidator.validate(body, { abortEarly: false });

      const result = await this.service.login(body);
      res.status(StatusCode.OK).json(result);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return;
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
