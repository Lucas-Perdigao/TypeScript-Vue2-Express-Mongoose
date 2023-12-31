import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { MongooseRoomType, RoomType } from "../model/RoomModel";
import { Model, isValidObjectId } from "mongoose";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { IRoomRepository } from "./RoomRepositoryInterface";
import { UpdateRoomDTO } from "../dtos/UpdateRoomDTO";
import { RoomQueryDTO } from "../dtos/RoomQueryDTO";

export class RoomRepository implements IRoomRepository {
  constructor(private readonly roomModel: Model<RoomType>) {}

  async getAll(query: RoomQueryDTO): Promise<RoomType[]> {
    const {page, limit, ...filters} = query
    
    if(page && limit){
      const rooms = this.roomModel.find({ ...filters, deletedAt: null }).sort({ createdAt: 1 }).skip((page - 1) * limit).limit(limit);
      return rooms;
    }

    const rooms = this.roomModel.find({...filters, deletedAt: null})
    return rooms;
  }

  async getById(id: string): Promise<MongooseRoomType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }
  
    const room = await this.roomModel.findOne({ _id: id, deletedAt: null });
    return room as MongooseRoomType;
  }  

  async create(room: CreateRoomDTO): Promise<RoomType> {
    const newRoom = await this.roomModel.create(room);
    return newRoom;
  }

  async update(id: string, roomData: UpdateRoomDTO): Promise<RoomType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const room = await this.getById(id)
    if(!room){
      throw new Error(ErrorMessages.NOT_FOUND('Room'))
    }

    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, roomData, { new: true })

    return updatedRoom as RoomType;
  }

  async softDelete(id: string): Promise<MongooseRoomType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const deletedRoom = await this.roomModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })

    return deletedRoom as MongooseRoomType;
  }
}