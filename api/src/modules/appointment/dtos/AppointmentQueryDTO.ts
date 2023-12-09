export interface AppointmentQueryDTO {
  page?: number,
  limit?: number,
  appointmentStart?: Date,
  appointmentEnd?: Date,
  client?: string,
  broker?: string,
  room?: string,
}