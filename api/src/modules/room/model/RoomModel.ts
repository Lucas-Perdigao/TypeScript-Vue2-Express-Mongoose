import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const roomSchema = new Schema({
  appointment: {
    type: Types.ObjectId,
    required: true,
    ref: "Appointment"
  },
  isAvailable: {
    type: Types.ObjectId,
    required: true
  }
}, { timestamps: true})

export type RoomType = InferSchemaType<typeof roomSchema>

export const RoomModel: Model<RoomType> = model('Room', roomSchema)