import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../user/repositories/UserRepository";
import { UserModel } from "../../user/model/UserModel";

class AuthFactory {
  static getInstance(){
    const repository = new UserRepository(UserModel)
    const service = new AuthService(repository)
    const controller = new AuthController(service)
    return controller
  }
}

export const authModule = AuthFactory.getInstance()