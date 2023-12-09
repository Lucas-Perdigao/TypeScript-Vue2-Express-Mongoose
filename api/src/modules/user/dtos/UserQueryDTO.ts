export interface UserQueryDTO {
  page?: number,
  limit?: number,
  name?: string;
  email?: string;
  role?: 'client' | 'broker';
  dailyAppointments?: number
}