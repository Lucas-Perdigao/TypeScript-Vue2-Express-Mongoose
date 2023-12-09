import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { IUserRepository } from "../repositories/UserRepositoryInterface";
import { UserType } from "../model/UserModel";
import { IUserService } from "./UserServiceInterface";
import { Crypt } from "../../../utils/crypt/Crypt";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UserQueryDTO } from "../dtos/UserQueryDTO";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(query: UserQueryDTO): Promise<UserType[] | null> {
    const users = await this.userRepository.getAll(query);

    if (!users || users.length === 0) {
      throw new Error(ErrorMessages.NOT_FOUND("Users"));
    }

    return users;
  }

  async getByEmail(email: string): Promise<UserType | null> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("User"));
    }

    return user;
  }

  async getById(id: string): Promise<UserType | null> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("User"));
    }

    return user;
  }

  async create(user: CreateUserDTO): Promise<UserType | null> {
    user.password = await this.hashPassword(user.password);
    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      throw new Error(ErrorMessages.CANNOT_CREATE("User"));
    }

    return newUser;
  }

  async update(id: string, userData: UpdateUserDTO): Promise<UserType | null> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("User"));
    }

    const updatedUser = await this.userRepository.update(id, userData);

    if (!updatedUser) {
      throw new Error(ErrorMessages.CANNOT_UPDATE("User"));
    }

    return updatedUser;
  }

  async softDelete(id: string): Promise<UserType | null> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("User"));
    }

    const deletedUser = await this.userRepository.softDelete(id);

    if (!deletedUser) {
      throw new Error(ErrorMessages.CANNOT_DELETE("User"));
    }

    return deletedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashLoops = 10;
    const hashedPassword = Crypt.encrypt(password, hashLoops);

    return hashedPassword;
  }
}
