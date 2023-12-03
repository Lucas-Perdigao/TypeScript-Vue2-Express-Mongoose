import { UserController } from "../controllers/UserController";
import { UserModel } from "../model/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

class UserFactory {
  static getInstance() {
    const userRepository = new UserRepository(UserModel);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return userController;
  }
}

export const userModule = UserFactory.getInstance();
