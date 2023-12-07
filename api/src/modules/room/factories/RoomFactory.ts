import { RoomController } from "../controllers/RoomController";
import { RoomModel } from "../model/RoomModel";
import { RoomRepository } from "../repositories/RoomRepository";
import { RoomService } from "../services/RoomService";

class RoomFactory {
  static getInstance(){
    const roomRepositoty = new RoomRepository(RoomModel)
    const roomService = new RoomService(roomRepositoty)
    const roomController = new RoomController(roomService)
    return roomController
  }
}

export const roomModule = RoomFactory.getInstance()