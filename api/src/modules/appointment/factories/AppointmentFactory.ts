import { UserModel } from "../../user/model/UserModel";
import { UserRepository } from "../../user/repositories/UserRepository";
import { AppointmentController } from "../controllers/AppointmentController";
import { AppointmentModel } from "../model/AppointmentModel";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppointmentService } from "../services/AppointmentService";

class AppointmentFactory {
  static getInstance() {
    const appointmentRepository = new AppointmentRepository(AppointmentModel)
    const userRepository = new UserRepository(UserModel)
    const appointmentService = new AppointmentService(appointmentRepository, userRepository)
    const appointmentController = new AppointmentController(appointmentService)
    return appointmentController
  }
}

export const appointmentModule = AppointmentFactory.getInstance()