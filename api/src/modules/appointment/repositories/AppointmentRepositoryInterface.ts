import { AppointmentType } from "../model/AppointmentModel";
import { AppointmentDTO } from "../dtos/AppointmentDTO";

export interface IAppointmentRepository {
  getAll(): Promise<AppointmentType[] | null>;
  getByDates(appointmentStart: Date, appointmentEnd: Date): Promise<AppointmentType[] | null>;
  getById(id: string): Promise<AppointmentType | null>
  getByUserId(userId: string): Promise<AppointmentType[] | null>;
  create(appointment: AppointmentDTO): Promise<AppointmentType | null>;
  update(id: string, appointmentData: AppointmentDTO): Promise<AppointmentType | null>;
  softDelete(id: string): Promise<AppointmentType | null>;
}