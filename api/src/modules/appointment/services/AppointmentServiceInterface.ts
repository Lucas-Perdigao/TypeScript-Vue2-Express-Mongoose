import { AppointmentDTO } from "../dtos/AppointmentDTO";
import { AppointmentType } from "../model/AppointmentModel";

export interface IAppointmentService {
  getAll(): Promise<AppointmentType[]>;
  getByDates(appointmentStart: Date, appointmentEnd: Date): Promise<AppointmentType[]>;
  getById(id: string): Promise<AppointmentType>;
  getByUserId(userId: string): Promise<AppointmentType[]>;
  create(appointment: AppointmentDTO): Promise<AppointmentType>;
  update(id: string, appointmentData: AppointmentDTO): Promise<AppointmentType>;
  softDelete(id: string): Promise<AppointmentType>;
}
