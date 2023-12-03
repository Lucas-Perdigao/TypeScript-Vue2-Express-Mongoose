import { InferSchemaType, Schema, Model, model, Types} from "mongoose";

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
  appointments: [{
    type: Types.ObjectId,
    ref: "Appointment"
  }],
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

export type UserType = InferSchemaType<typeof userSchema>

export const UserModel: Model<UserType> = model("User", userSchema)