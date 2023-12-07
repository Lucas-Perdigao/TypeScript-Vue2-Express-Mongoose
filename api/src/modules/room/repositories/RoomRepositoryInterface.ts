import { RoomType } from "../model/RoomModel";
import { RoomDTO } from "../dtos/CreateRoomDTO";

export interface IRoomRepository {
  getAll(): Promise<RoomType[]>;
  getById(id: string): Promise<RoomType | null>;
  create(room: RoomDTO): Promise<RoomType>;
  update(id: string, roomData: RoomDTO): Promise<RoomType>;
  softDelete(id: string): Promise<RoomType>;
}