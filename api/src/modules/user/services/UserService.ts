import { UserDTO } from "../dtos/UserDTO";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { UserType } from "../model/UserModel";
import { IUserService } from "./UserServiceInterface";
import bcrypt from "bcrypt";

export class UserService implements IUserService{
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<UserType[] | null> {
    try {
      const users = await this.userRepository.getAll();

      if (!users) {
        throw new Error(ErrorMessages.NOT_FOUND("Users"));
      }

      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string): Promise<UserType | null> {
    try {
      const user = await this.userRepository.getByEmail(email);

      if (!user) {
        throw new Error(ErrorMessages.NOT_FOUND("User"));
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<UserType | null> {
    try {
      const user = await this.userRepository.getById(id);

      if (!user) {
        throw new Error(ErrorMessages.NOT_FOUND("User"));
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(user: UserDTO): Promise<UserType | null> {
    try {
      user.password = await this.hashPassword(user.password);
      const newUser = await this.userRepository.create(user);

      if (!newUser) {
        throw new Error(ErrorMessages.CANNOT_CREATE("User"));
      }

      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, userData: UserDTO): Promise<UserType | null> {
    try {
      const updatedUser = await this.userRepository.update(id, userData);

      if (!updatedUser) {
        throw new Error(ErrorMessages.CANNOT_UPDATE("User"));
      }

      return updatedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async softDelete(id: string): Promise<UserType | null> {
    try {
      const deletedUser = await this.userRepository.softDelete(id);

      if (!deletedUser) {
        throw new Error(ErrorMessages.CANNOT_DELETE("User"));
      }

      return deletedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const hashLoops = 10;
    const hashedPassword = await bcrypt.hash(password, hashLoops);

    return hashedPassword;
  }
}
