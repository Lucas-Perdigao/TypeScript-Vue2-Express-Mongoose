import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";
import { AppointmentType } from "../model/AppointmentModel";

export interface IAppointmentService {
  getAll(): Promise<AppointmentType[]>;
  getByDates(appointmentStart: Date, appointmentEnd: Date): Promise<AppointmentType[]>;
  getById(id: string): Promise<AppointmentType>;
  getByUserId(userId: string): Promise<AppointmentType[]>;
  create(appointment: CreateAppointmentDTO): Promise<AppointmentType>;
  update(id: string, appointmentData: UpdateAppointmentDTO): Promise<AppointmentType>;
  softDelete(id: string): Promise<AppointmentType>;
}
