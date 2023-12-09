import { IUserService } from "../services/UserServiceInterface";
import { fakeUser } from "./fakeUser";


export const fakeUserService = {
  getAll(){
    return Promise.resolve(Array.from({ length: 10 }, () => fakeUser))
  },

  getByEmail(){
    return Promise.resolve(fakeUser)
  },

  getById(){
    return Promise.resolve(fakeUser)
  },

  create(){
    return Promise.resolve(fakeUser)
  },

  update(){
    return Promise.resolve(fakeUser)
  },

  softDelete(){
    return Promise.resolve(fakeUser)
  }
} as unknown as IUserService