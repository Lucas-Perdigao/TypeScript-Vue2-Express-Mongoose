import { IAppointmentService } from "../services/AppointmentServiceInterface"
import { fakeAppointment } from "./fakeAppointment"

export const fakeAppointmentService = {
  create() {
    return Promise.resolve(fakeAppointment);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeAppointment));
  },

  getByDates() {
    return Promise.resolve(Array.from({ length: 5 }, () => fakeAppointment))
  },

  getById() {
    return Promise.resolve(fakeAppointment);
  },

  getByUserId() {
    return Promise.resolve(Array.from({ length: 5 }, () => fakeAppointment))
  },

  getByUserRoom() {
    return Promise.resolve(Array.from({ length: 5 }, () => fakeAppointment))
  },

  update() {
    return Promise.resolve(fakeAppointment);
  },

  softDelete() {
    return Promise.resolve(fakeAppointment);
  },
} as unknown as IAppointmentService;