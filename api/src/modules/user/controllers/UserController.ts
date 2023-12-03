import { Request, Response } from "express";
import { IUserService } from "../services/UserServiceInterface";
import { UserDTO } from "../dtos/UserDTO";
import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { userSchemaValidator } from "../utils/userSchemaValidator";
import { IUserController } from "./UserControllerInterface";

export class UserController implements IUserController{
  constructor(private readonly userService: IUserService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAll();
      res
        .status(StatusCode.OK)
        .json(users);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async getByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query
      const user = await this.userService.getByEmail(email as string);
      res
        .status(StatusCode.OK)
        .json(user);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const user = await this.userService.getById(id);
      res
        .status(StatusCode.OK)
        .json(user);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserDTO = req.body;
      await userSchemaValidator.validate(userData, { abortEarly: false });
      const newUser = await this.userService.create(userData);
      res
        .status(StatusCode.CREATED)
        .json(newUser);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const userData: UserDTO = req.body;
      await userSchemaValidator.validate(userData, { abortEarly: false });
      const updatedUser = await this.userService.update(id, userData);
      res
        .status(StatusCode.OK)
        .json(updatedUser);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deletedUser = await this.userService.softDelete(id);
      res
        .status(StatusCode.OK)
        .json(deletedUser);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
