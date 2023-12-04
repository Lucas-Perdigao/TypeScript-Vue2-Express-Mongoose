import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { AppointmentType } from "../model/AppointmentModel";
import { Model, isValidObjectId } from "mongoose";
import { AppointmentDTO } from "../dtos/AppointmentDTO";
import { IAppointmentRepository } from "./AppointmentRepositoryInterface";

export class AppointmentRepository implements IAppointmentRepository {
  constructor(private readonly appointmentModel: Model<AppointmentType>) {}

  async getAll(): Promise<AppointmentType[]> {
    try {
      const appointments = this.appointmentModel
        .find({ deletedAt: null })
        .populate("client")
        .populate("broker");
      return appointments;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByDates(
    appointmentStart: Date,
    appointmentEnd: Date
  ): Promise<AppointmentType[]> {
    try {
      const appointments = await this.appointmentModel
        .find({
          appointmentStart: { $gte: appointmentStart },
          appointmentEnd: { $lte: appointmentEnd },
          deletedAt: null,
        })
        .populate("client")
        .populate("broker");
      return appointments;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<AppointmentType | null> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const appointment = await this.appointmentModel.findOne({
        _id: id,
        deletedAt: null,
      })        
        .populate("client")
        .populate("broker");
      return appointment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByUserId(userId: string): Promise<AppointmentType[]> {
    try {
      if (!isValidObjectId(userId)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(userId));
      }

      const appointments = await this.appointmentModel.find({
        $or: [{ client: userId }, { broker: userId }],
        deletedAt: null,
      })
        .populate("client")
        .populate("broker");
      return appointments;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(appointment: AppointmentDTO): Promise<AppointmentType> {
    try {
      const newAppointment = await this.appointmentModel.create(appointment);
      return newAppointment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    appointmentData: AppointmentDTO
  ): Promise<AppointmentType> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const updatedAppointment = await this.appointmentModel
        .findByIdAndUpdate(id, appointmentData, { new: true })
        .populate("client")
        .populate("broker");
      return updatedAppointment as AppointmentType;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async softDelete(id: string): Promise<AppointmentType> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(ErrorMessages.ID_NOT_VALID(id));
      }

      const deletedAppointment = await this.appointmentModel
        .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        .populate("client")
        .populate("broker");
      return deletedAppointment as AppointmentType;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
