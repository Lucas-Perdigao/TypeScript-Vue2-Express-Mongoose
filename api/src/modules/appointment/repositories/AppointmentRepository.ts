import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { AppointmentType } from "../model/AppointmentModel";
import { Model, isValidObjectId } from "mongoose";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { IAppointmentRepository } from "./AppointmentRepositoryInterface";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";
import { AppointmentQueryDTO } from "../dtos/AppointmentQueryDTO";

export class AppointmentRepository implements IAppointmentRepository {
  constructor(private readonly appointmentModel: Model<AppointmentType>) {}

  async getAll(query: AppointmentQueryDTO): Promise<AppointmentType[]> {
    const {page, limit, ...filters} = query

    if(page && limit){
      const appointments = this.appointmentModel
      .find({...filters, deletedAt: null})
      .populate("client")
      .populate("broker")
      .populate("room")
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

      return appointments
    }

    const appointments = this.appointmentModel
      .find({...filters, deletedAt: null})
      .populate("client")
      .populate("broker")
      .populate("room")
    return appointments;
  }

  async getByDates(
    appointmentStart: Date,
    appointmentEnd: Date
  ): Promise<AppointmentType[]> {
    const appointments = await this.appointmentModel
      .find({
        appointmentStart: { $gte: appointmentStart },
        appointmentEnd: { $lte: appointmentEnd },
        deletedAt: null,
      })
      .populate("client")
      .populate("broker")
      .populate("room")
    return appointments;
  }

  async getById(id: string): Promise<AppointmentType | null> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const appointment = await this.appointmentModel
      .findOne({
        _id: id,
        deletedAt: null,
      })
      .populate("client")
      .populate("broker")
      .populate("room")

    return appointment;
  }

  async getByUserId(userId: string): Promise<AppointmentType[]> {
    if (!isValidObjectId(userId)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(userId));
    }

    const appointments = await this.appointmentModel
      .find({
        $or: [{ client: userId }, { broker: userId }],
        deletedAt: null,
      })
      .populate("client")
      .populate("broker")
      .populate("room")
    return appointments;
  }

  async getByRoomId(roomId: string): Promise<AppointmentType[]> {
    if (!isValidObjectId(roomId)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(roomId));
    }
    const appointments = await this.appointmentModel
      .find({
        room: roomId,
        deletedAt: null,
      })
      .populate("client")
      .populate("broker")
      .populate("room")
    return appointments;
  }

  async create(appointment: CreateAppointmentDTO): Promise<AppointmentType> {
    const newAppointment = await this.appointmentModel.create(appointment);
    return newAppointment;
  }

  async update(
    id: string,
    appointmentData: UpdateAppointmentDTO
  ): Promise<AppointmentType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const appointment = await this.getById(id)
    if(!appointment){
      throw new Error(ErrorMessages.NOT_FOUND("Appointment"))
    }

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, appointmentData, { new: true })
      .populate("client")
      .populate("broker")
      .populate("room")
    return updatedAppointment as AppointmentType;
  }

  async softDelete(id: string): Promise<AppointmentType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const deletedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .populate("client")
      .populate("broker")
      .populate("room")
    return deletedAppointment as AppointmentType;
  }
}
