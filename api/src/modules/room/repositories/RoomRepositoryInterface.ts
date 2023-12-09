import { MongooseRoomType, RoomType } from "../model/RoomModel";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { UpdateRoomDTO } from "../dtos/UpdateRoomDTO";
import { RoomQueryDTO } from "../dtos/RoomQueryDTO";

export interface IRoomRepository {
  getAll(query: RoomQueryDTO): Promise<RoomType[] | null>;
  getById(id: string): Promise<MongooseRoomType | null>;
  create(room: CreateRoomDTO): Promise<RoomType> | null;
  update(id: string, roomData: UpdateRoomDTO): Promise<RoomType | null>;
  softDelete(id: string): Promise<MongooseRoomType | null>;
}