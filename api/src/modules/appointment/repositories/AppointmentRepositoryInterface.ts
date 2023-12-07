import { AppointmentType } from "../model/AppointmentModel";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";

export interface IAppointmentRepository {
  getAll(): Promise<AppointmentType[]>;
  getByDates(appointmentStart: Date, appointmentEnd: Date): Promise<AppointmentType[]>;
  getById(id: string): Promise<AppointmentType | null>
  getByUserId(userId: string): Promise<AppointmentType[]>;
  getByRoomId(roomId: string): Promise<AppointmentType[]>
  create(appointment: CreateAppointmentDTO): Promise<AppointmentType>;
  update(id: string, appointmentData: UpdateAppointmentDTO): Promise<AppointmentType>;
  softDelete(id: string): Promise<AppointmentType>;
}