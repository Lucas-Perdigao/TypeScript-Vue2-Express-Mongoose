
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { RoomType } from "../model/RoomModel";
import { IRoomRepository } from "../repositories/RoomRepositoryInterface";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { IRoomService } from "./RoomServiceInterface";
import { roomConfig } from "../utils/roomConfig";
import { UpdateRoomDTO } from "../dtos/UpdateRoomDTO";

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

  async create(room: CreateRoomDTO): Promise<RoomType> {
    const allRooms = await this.roomRepository.getAll()
    if(allRooms.length >= roomConfig.MAX_ROOMS){
      throw new Error(ErrorMessages.MAX_NUMBER('rooms'))
    }
    
    const newRoom = await this.roomRepository.create(room)

    if(!newRoom){
      throw new Error(ErrorMessages.CANNOT_CREATE('Room'))
    }

    return newRoom
  }

  async update(id: string, roomData: UpdateRoomDTO): Promise<RoomType> {
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