import { fakeAppointment } from "./fakeAppointment";
import { AppointmentType } from "../model/AppointmentModel";
import { Model } from "mongoose";

export const fakeAppointmentModel = {
  find: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => Array.from({ length: 10 }, () => fakeAppointment)),
  })),

  findOne: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeAppointment),
  })),

  findById: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeAppointment),
  })),

  create: jest.fn().mockImplementation(() => fakeAppointment),

  findByIdAndUpdate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeAppointment),
  })),

  findByIdAndDelete: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => fakeAppointment),
  })),
} as unknown as Model<AppointmentType>;