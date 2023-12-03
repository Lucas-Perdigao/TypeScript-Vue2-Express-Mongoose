import { Model, isValidObjectId } from "mongoose";
import { UserType } from "../model/UserModel";
import { UserDTO } from "../dtos/UserDTO";
import { IUserRepository } from "./UserRepositoryInterface";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";

export class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<UserType>) {}

  async getAll(): Promise<UserType[] | null> {
    const users = this.userModel.find({ deletedAt: null }).populate("appointments").exec()
    return users;
  }

  async getByEmail(email: string): Promise<UserType | null> {
    const user = await this.userModel.findOne({
      email: email,
      deletedAt: null,
    }).populate("appointments").exec()
    return user;
  }

  async getById(id: string): Promise<UserType | null> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const user = await this.userModel.findOne({ _id: id, deletedAt: null }).populate("appointments").exec();
    return user;
  }

  async create(user: UserDTO): Promise<UserType> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async update(id: string, userData: UserDTO): Promise<UserType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
      new: true,
    }).populate("appointments").exec();
    return updatedUser as UserType;
  }

  async softDelete(id: string): Promise<UserType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    ).populate("appointments").exec()
    return deletedUser as UserType;
  }
}
