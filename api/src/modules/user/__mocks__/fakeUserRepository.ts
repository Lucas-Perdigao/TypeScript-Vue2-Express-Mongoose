import { IUserRepository } from "../repositories/UserRepositoryInterface"
import { fakeUser } from "./fakeUser"

export const fakeUserRepository = {
  create() {
    return Promise.resolve(fakeUser);
  },

  getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeUser));
  },

  getById() {
    return Promise.resolve(fakeUser);
  },

  getByEmail() {
    return Promise.resolve(fakeUser);
  },

  update() {
    return Promise.resolve(fakeUser);
  },

  addAppointment() {
    return Promise.resolve(fakeUser)
  },

  softDelete() {
    return Promise.resolve(fakeUser);
  },
} as unknown as IUserRepository;