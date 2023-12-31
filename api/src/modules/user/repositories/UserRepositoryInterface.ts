import { MongooseUserType, UserType } from "../model/UserModel";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UserQueryDTO } from "../dtos/UserQueryDTO";

export interface IUserRepository {
  getAll(query: UserQueryDTO): Promise<UserType[] | null>;
  getByEmail(email: string): Promise<UserType | null>;
  getById(id: string): Promise<MongooseUserType | null>;
  create(user: CreateUserDTO): Promise<UserType | null>;
  update(id: string, userData: UpdateUserDTO): Promise<UserType | null>;
  addAppointment(id: string): Promise<UserType>
  softDelete(id: string): Promise<UserType | null>;
}