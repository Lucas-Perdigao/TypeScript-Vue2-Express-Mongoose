import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true})

export type RoomType = InferSchemaType<typeof roomSchema>

export type MongooseRoomType = RoomType & {
  _id: Types.ObjectId | string
  createdAt: Date,
  updatedAt: Date
}

export const RoomModel: Model<RoomType> = model('Room', roomSchema)