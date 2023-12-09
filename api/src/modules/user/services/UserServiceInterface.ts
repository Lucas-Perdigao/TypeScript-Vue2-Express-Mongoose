import { UserType } from "../model/UserModel";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UserQueryDTO } from "../dtos/UserQueryDTO";

interface IUserService {
  getAll(query: UserQueryDTO): Promise<UserType[] | null>;
  getByEmail(email: string): Promise<UserType | null>;
  getById(id: string): Promise<UserType | null>;
  create(user: CreateUserDTO): Promise<UserType | null>;
  update(id: string, userData: UpdateUserDTO): Promise<UserType | null>;
  softDelete(id: string): Promise<UserType | null>;
}

export { IUserService };
