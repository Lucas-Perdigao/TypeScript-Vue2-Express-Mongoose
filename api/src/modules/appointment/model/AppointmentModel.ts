import { InferSchemaType, Schema, Model, model, Types } from "mongoose";

const appointmentSchema = new Schema({
  appointmentStart: {
    type: Date,
    required: true
  },
  appointmentEnd: {
    type: Date,
    required: true
  },
  client: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  broker: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  room: {
    type: Types.ObjectId,
    ref: "Room",
    required: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
{timestamps: true})

export type AppointmentType = InferSchemaType<typeof appointmentSchema>

export const AppointmentModel: Model<AppointmentType> = model("Appointment", appointmentSchema)