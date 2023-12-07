export interface UserDTO {
  name: string,
  email: string,
  password: string
  role: string
  dailyAppointments?: number
}