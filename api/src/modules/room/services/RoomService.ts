import { isValidObjectId } from "mongoose";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { RoomType } from "../model/RoomModel";
import { IRoomRepository } from "../repositories/RoomRepositoryInterface";
import { RoomDTO } from "../dtos/RoomDTO";
import { IRoomService } from "./RoomServiceInterface";

export class RoomService implements IRoomService{
  constructor(private readonly roomRepository: IRoomRepository){}

  async getAll(): Promise<RoomType[]>{
    const rooms = await this.roomRepository.getAll()
    
    if(!rooms){
      throw new Error(ErrorMessages.NOT_FOUND('Rooms'))
    }

    return rooms
  }

  async getById(id: string): Promise<RoomType> {
    const room = await this.roomRepository.getById(id)

    if(!room){
      throw new Error(ErrorMessages.NOT_FOUND('Room'))
    }

    return room
  }

  async create(room: RoomDTO): Promise<RoomType> {
    const newRoom = await this.roomRepository.create(room)

    if(!newRoom){
      throw new Error(ErrorMessages.CANNOT_CREATE('Room'))
    }

    return newRoom
  }

  async update(id: string, roomData: RoomDTO): Promise<RoomType> {
    const room = await this.roomRepository.getById(id)

    if(!room){
      throw new Error(ErrorMessages.NOT_FOUND("Room"))
    }

    const updatedRoom = await this.roomRepository.update(id, roomData)

    if(!updatedRoom){
      throw new Error(ErrorMessages.CANNOT_UPDATE("Room"))
    }

    return updatedRoom
  }

  async softDelete(id: string){
    const room = await this.roomRepository.getById(id)

    if(!room){
      throw new Error(ErrorMessages.NOT_FOUND('Room'))
    }

    const deletedRoom = await this.roomRepository.softDelete(id)

    if(!deletedRoom){
      throw new Error(ErrorMessages.CANNOT_DELETE("Room"))
    }

    return deletedRoom
  }
}