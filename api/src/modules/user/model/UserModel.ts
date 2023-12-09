import { InferSchemaType, Schema, Model, model, Types} from "mongoose";
import { userConfig } from "../utils/userConfig";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'broker'],
    required: true,
  },
  dailyAppointments: {
    type: Number,
    max: userConfig.MAX_DAILY_APPOINTMENTS,
    default: 0
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

export type UserType = InferSchemaType<typeof userSchema>

export type MongooseUserType = UserType & {
  _id: Types.ObjectId | string
  role: 'client' | 'broker'
  createdAt: Date,
  updatedAt: Date
}

export const UserModel: Model<UserType> = model("User", userSchema)