import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { RoomType } from "../model/RoomModel";
import { Model, isValidObjectId } from "mongoose";
import { RoomDTO } from "../dtos/RoomDTO";
import { IRoomRepository } from "./RoomRepositoryInterface";

export class RoomRepository implements IRoomRepository {
  constructor(private readonly roomModel: Model<RoomType>) {}

  async getAll(): Promise<RoomType[]> {
    const rooms = this.roomModel
      .find({ deletedAt: null })
      .populate("appointment");
    return rooms;
  }

  async getById(id: string): Promise<RoomType | null> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const room = await this.roomModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .populate("appointment");
    return room;
  }

  async create(room: RoomDTO): Promise<RoomType> {
    const newRoom = await this.roomModel.create(room);
    return newRoom;
  }

  async update(id: string, roomData: RoomDTO): Promise<RoomType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const room = await this.getById(id)
    if(!room){
      throw new Error(ErrorMessages.NOT_FOUND('Room'))
    }

    const updatedRoom = await this.roomModel
      .findByIdAndUpdate(id, roomData, { new: true })
      .populate("appointment");
    return updatedRoom as RoomType;
  }

  async softDelete(id: string): Promise<RoomType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const deletedRoom = await this.roomModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .populate("appointment");
    return deletedRoom as RoomType;
  }
}
