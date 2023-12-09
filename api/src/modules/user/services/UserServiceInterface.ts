import { UserType } from "../model/UserModel";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UserQueryDTO } from "../dtos/UserQueryDTO";

interface IUserService {
  getAll(query: UserQueryDTO): Promise<UserType[]>;
  getByEmail(email: string): Promise<UserType>;
  getById(id: string): Promise<UserType>;
  create(user: CreateUserDTO): Promise<UserType>;
  update(id: string, userData: UpdateUserDTO): Promise<UserType>;
  softDelete(id: string): Promise<UserType>;
}

export { IUserService };
