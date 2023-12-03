import { UserController } from "../controllers/UserController";
import { UserModel } from "../model/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

class UserFactory {
  static getInstance() {
    const repository = new UserRepository(UserModel);
    const service = new UserService(repository);
    const controller = new UserController(service);
    return controller;
  }
}

export const userModule = UserFactory.getInstance();
