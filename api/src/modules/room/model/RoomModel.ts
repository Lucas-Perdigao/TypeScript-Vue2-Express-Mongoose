import { InferSchemaType, Model, Schema, Types, model } from "mongoose";

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  appointments: [{
    type: Types.ObjectId,
    ref: "Appointment"
  }],
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true})

export type RoomType = InferSchemaType<typeof roomSchema>

export const RoomModel: Model<RoomType> = model('Room', roomSchema)