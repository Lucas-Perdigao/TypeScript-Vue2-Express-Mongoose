export interface UpdateAppointmentDTO {
  appointmentStart?: Date | string,
  appointmentEnd?: Date | string,
  client?: string,
  broker?: string,
  room?: string
}