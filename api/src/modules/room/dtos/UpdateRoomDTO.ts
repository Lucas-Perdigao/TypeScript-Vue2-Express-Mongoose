import { Types } from 'mongoose'

export interface UpdateRoomDTO {
  name?: string,
  appointment?: [Types.ObjectId]
}