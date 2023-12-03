import { Model } from 'mongoose'
import { UserType } from '../model/UserModel'
import { fakeUserData, fakeUpdatedUser, fakeDeletedUser } from './fakeUserData'

export const fakeUserModel  = {
  find: () => jest.fn().mockResolvedValue(fakeUserData),
  findOne: () => jest.fn().mockResolvedValue(fakeUserData[0]),
  create: () => jest.fn().mockResolvedValue(fakeUserData[0]),
  findByIdAndUpdate: () => jest.fn().mockResolvedValue(fakeUpdatedUser),
  delete: () => jest.fn().mockResolvedValue(fakeDeletedUser)
} as unknown as Model<UserType>