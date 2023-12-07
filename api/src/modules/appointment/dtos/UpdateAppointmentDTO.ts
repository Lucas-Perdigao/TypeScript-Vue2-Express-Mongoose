export interface UpdateAppointmentDTO {
  appointmentStart?: Date,
  appointmentEnd?: Date,
  client?: string,
  broker?: string,
  room?: string
}