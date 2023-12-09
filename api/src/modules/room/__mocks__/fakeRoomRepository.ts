import { IRoomRepository } from "../repositories/RoomRepositoryInterface"
import { roomConfig } from "../utils/roomConfig";
import { fakeRoom } from "./fakeRoom"

export const fakeRoomRepository = {
  create() {
    return Promise.resolve(fakeRoom);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: roomConfig.MAX_ROOMS }, () => fakeRoom));
  },

  getById() {
    return Promise.resolve(fakeRoom);
  },

  update() {
    return Promise.resolve(fakeRoom);
  },

  softDelete() {
    return Promise.resolve(fakeRoom);
  },
} as unknown as IRoomRepository;