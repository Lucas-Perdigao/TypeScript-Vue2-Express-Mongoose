import { MongooseRoomType, RoomType } from "../model/RoomModel";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { UpdateRoomDTO } from "../dtos/UpdateRoomDTO";
import { RoomQueryDTO } from "../dtos/RoomQueryDTO";

export interface IRoomRepository {
  getAll(query: RoomQueryDTO): Promise<RoomType[]>;
  getById(id: string): Promise<MongooseRoomType>;
  create(room: CreateRoomDTO): Promise<RoomType>;
  update(id: string, roomData: UpdateRoomDTO): Promise<RoomType>;
  softDelete(id: string): Promise<MongooseRoomType>;
}