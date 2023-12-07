export interface CreateAppointmentDTO {
  appointmentStart: Date,
  appointmentEnd: Date,
  client: string,
  broker: string,
  room: string
}