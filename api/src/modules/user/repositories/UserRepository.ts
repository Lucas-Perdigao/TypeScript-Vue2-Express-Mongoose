import { Model, isValidObjectId } from "mongoose";
import { UserType } from "../model/UserModel";
import { UserDTO } from "../dtos/UserDTO";
import { IUserRepository } from "./UserRepositoryInterface";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";

export class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<UserType>) {}

  async getAll(): Promise<UserType[] | null> {
    try {
      return await this.userModel.find({deletedAt: null});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string): Promise<UserType | null> {
    try {
      const user = (await this.userModel.findOne({ email: email, deletedAt: null })) as UserType;
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<UserType | null> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const user = (await this.userModel.findOne({_id: id, deletedAt: null})) as UserType;
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(user: UserDTO): Promise<UserType> {
    try {
      const newUser = (await this.userModel.create(user)) as UserType;
      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: string, userData: UserDTO): Promise<UserType> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const updatedUser = (await this.userModel.findByIdAndUpdate(
        id,
        userData,
        { new: true }
      )) as UserType;
      return updatedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async softDelete(id: string): Promise<UserType> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const deletedUser = (await this.userModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      )) as UserType;
      return deletedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
