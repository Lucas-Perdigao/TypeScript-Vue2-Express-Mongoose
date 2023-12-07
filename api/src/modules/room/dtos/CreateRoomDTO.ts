import { Types } from 'mongoose'

export interface CreateRoomDTO {
  name: string,
  appointment?: [Types.ObjectId]
}