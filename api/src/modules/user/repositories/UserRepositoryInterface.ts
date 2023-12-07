import { UserType } from "../model/UserModel";
import { UserDTO } from "../dtos/UserDTO";
import { Types } from "mongoose";

export interface IUserRepository {
  getAll(): Promise<UserType[] | null>;
  getByEmail(email: string): Promise<UserType | null>;
  getById(id: string): Promise<UserType | null>;
  create(user: UserDTO): Promise<UserType | null>;
  update(id: string, userData: UserDTO): Promise<UserType | null>;
  addAppointment(id: string): Promise<UserType>
  softDelete(id: string): Promise<UserType | null>;
}