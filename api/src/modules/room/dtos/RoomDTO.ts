import { Types } from 'mongoose'

export interface RoomDTO {
  appointment: Types.ObjectId
  isAvailable: boolean
}