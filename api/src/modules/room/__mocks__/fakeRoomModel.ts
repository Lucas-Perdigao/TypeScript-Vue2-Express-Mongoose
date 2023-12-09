import { fakeRoom } from "./fakeRoom";
import { RoomType } from "../model/RoomModel";
import { Model } from "mongoose";
import { roomConfig } from "../utils/roomConfig";

export const fakeRoomModel = {
  find: jest
    .fn()
    .mockImplementation(() => Array.from({ length: roomConfig.MAX_ROOMS }, () => fakeRoom)),
  findById: jest.fn().mockImplementation(() => fakeRoom),
  findOne: jest.fn().mockImplementation(() => fakeRoom),
  create: jest.fn().mockImplementation(() => fakeRoom),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeRoom),
} as unknown as Model<RoomType>;
