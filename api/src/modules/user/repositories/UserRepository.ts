import { Model, isValidObjectId } from "mongoose";
import { UserType } from "../model/UserModel";
import { UserDTO } from "../dtos/UserDTO";
import { IUserRepository } from "./UserRepositoryInterface";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";

export class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<UserType>) {}

  async getAll(): Promise<UserType[] | null> {
    const users = this.userModel.find({ deletedAt: null })
    return users;
  }

  async getByEmail(email: string): Promise<UserType | null> {
    const user = await this.userModel.findOne({
      email: email,
      deletedAt: null,
    })
    return user;
  }

  async getById(id: string): Promise<UserType | null> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const user = await this.userModel.findOne({ _id: id, deletedAt: null })
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

    const user = await this.getById(id)
    if(!user){
      throw new Error(ErrorMessages.NOT_FOUND("User"))
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
      new: true,
    })
    return updatedUser as UserType;
  }

  async addAppointment(id: string): Promise<UserType>{
    if(!isValidObjectId(id)){
      throw new Error(ErrorMessages.ID_NOT_VALID(id))
    }

    const user = await this.getById(id)

    if(!user){
      throw new Error(ErrorMessages.NOT_FOUND("User"))
    }

    if(user && user.role != 'broker'){
      throw new Error(ErrorMessages.ROLE_NOT_ALLOWED('client'))
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, {$push: {dailyAppointments: 1}}, {new: true})
    return updatedUser as UserType

  }

  async softDelete(id: string): Promise<UserType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    )
    return deletedUser as UserType;
  }
}
