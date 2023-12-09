import { IRoomService } from "../services/RoomServiceInterface";
import { fakeRoom } from "./fakeRoom";


export const fakeRoomService = {
  getAll(){
    return Promise.resolve(Array.from({ length: 10 }, () => fakeRoom))
  },

  getById(){
    return Promise.resolve(fakeRoom)
  },

  create(){
    return Promise.resolve(fakeRoom)
  },

  update(){
    return Promise.resolve(fakeRoom)
  },

  softDelete(){
    return Promise.resolve(fakeRoom)
  }
} as unknown as IRoomService