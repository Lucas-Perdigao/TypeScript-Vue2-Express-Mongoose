import { fakeUser } from "./fakeUser";
import { UserType } from "../model/UserModel";
import { Model } from "mongoose";

export const fakeUserModel = {
  find: jest
    .fn()
    .mockImplementation(() => Array.from({ length: 10 }, () => fakeUser)),
  findById: jest.fn().mockImplementation(() => fakeUser),
  findOne: jest.fn().mockImplementation(() => fakeUser),
  create: jest.fn().mockImplementation(() => fakeUser),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeUser),
} as unknown as Model<UserType>;
