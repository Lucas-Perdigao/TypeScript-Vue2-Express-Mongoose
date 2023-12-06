import { RoomType } from "../model/RoomModel";
import { RoomDTO } from "../dtos/RoomDTO";

export interface IRoomRepository {
  getAll(): Promise<RoomType[]>;
  getById(id: string): Promise<RoomType | null>;
  create(room: RoomDTO): Promise<RoomType>;
  update(id: string, roomData: RoomDTO): Promise<RoomType>;
  softDelete(id: string): Promise<RoomType>;
}
