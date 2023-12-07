import { MongooseRoomType } from "../../room/model/RoomModel";
import { MongooseUserType } from "../../user/model/UserModel";

export interface VerifiedEntitiesDTO {
  appointmentRoom: MongooseRoomType,
  brokerUser: MongooseUserType
}
