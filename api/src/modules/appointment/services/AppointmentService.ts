import { isValidObjectId } from "mongoose";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { IAppointmentRepository } from "../repositories/AppointmentRepositoryInterface";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { IAppointmentService } from "./AppointmentServiceInterface";
import { AppointmentType } from "../model/AppointmentModel";
import { AppointmentDuration } from "../utils/appointmentDuration";
import { IUserRepository } from "../../user/repositories/UserRepositoryInterface";
import { MongooseUserType, UserType } from "../../user/model/UserModel";
import { userConfig } from "../../user/utils/userConfig";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";
import { IRoomRepository } from "../../room/repositories/RoomRepositoryInterface";
import { RoomType } from "../../room/model/RoomModel";

export class AppointmentService implements IAppointmentService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly userRepository: IUserRepository,
    private readonly roomRepositoty: IRoomRepository
  ) {}

  async getAll(): Promise<AppointmentType[]> {
    const appointments = await this.appointmentRepository.getAll()

    if (!appointments) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointments"));
    }
    return appointments;
  }

  async getByDates(
    appointmentStart: Date,
    appointmentEnd: Date
  ): Promise<AppointmentType[]> {
    const appointments = await this.appointmentRepository.getByDates(
      appointmentStart,
      appointmentEnd
    );

    if (!appointments) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointments"));
    }

    return appointments;
  }

  async getById(id: string): Promise<AppointmentType> {
    if (!isValidObjectId(id)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(id));
    }

    const appointment = await this.appointmentRepository.getById(id);

    if (!appointment) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointment"));
    }

    return appointment;
  }

  async getByUserId(userId: string): Promise<AppointmentType[]> {
    if (!isValidObjectId(userId)) {
      throw new Error(ErrorMessages.ID_NOT_VALID(userId));
    }

    const appointments = await this.appointmentRepository.getByUserId(userId);

    if (!appointments) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointments"));
    }

    return appointments;
  }

  async create(appointment: CreateAppointmentDTO): Promise<AppointmentType> {
    const { appointmentStart, appointmentEnd, broker, client, room } = appointment;

    const {verifiedAppointmentStart, verifiedAppointmentEnd} = this.verifyAndReturnDates(appointmentStart, appointmentEnd)

    this.verifyAppointmentDuration(verifiedAppointmentStart, verifiedAppointmentEnd);

    const appointmentRoom = await this.roomRepositoty.getById(room)
    if(!appointmentRoom){
      throw new Error(ErrorMessages.NOT_FOUND("Room"))
    }

    const clientUser = await this.userRepository.getById(client);
    if (!clientUser || clientUser.role !== "client") {
      throw new Error(ErrorMessages.NOT_FOUND("Client"));
    }

    const brokerUser = (await this.userRepository.getById(broker)) as MongooseUserType;
    if (!brokerUser || brokerUser.role !== "broker") {
      throw new Error(ErrorMessages.NOT_FOUND("Broker"));
    }

    if (brokerUser.dailyAppointments && brokerUser.dailyAppointments >= userConfig.MAX_DAILY_APPOINTMENTS) {
      throw new Error(
        ErrorMessages.MAX_NUMBER("daily appointments for this broker")
      );
    }

    await this.verifyBrokerIsAvailable(brokerUser._id.toString(), appointmentStart, appointmentEnd);

    await this.verifyRoomIsAvailable(appointmentRoom, appointmentStart, appointmentEnd)

    const newAppointment = await this.appointmentRepository.create(appointment);

    if (!newAppointment) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Appointment"));
    }

    await this.userRepository.addAppointment(brokerUser._id.toString());

    return newAppointment;
  }

  async update(
    id: string,
    appointmentData: UpdateAppointmentDTO
  ): Promise<AppointmentType> {
    const user = await this.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointment"));
    }

    const updatedAppointment = await this.appointmentRepository.update(
      id,
      appointmentData
    );

    if (!updatedAppointment) {
      throw new Error(ErrorMessages.CANNOT_UPDATE("Appointment"));
    }

    return updatedAppointment;
  }

  async softDelete(id: string): Promise<AppointmentType> {
    const user = await this.getById(id);
    if (!user) {
      throw new Error(ErrorMessages.NOT_FOUND("User"));
    }

    const deletedAppointment = await this.appointmentRepository.softDelete(id);

    if (!deletedAppointment) {
      throw new Error(ErrorMessages.CANNOT_DELETE("Appointment"));
    }

    return deletedAppointment;
  }

  private verifyRoomIsAvailable(appointmentRoom: RoomType, appointmentStart: Date, appointmentEnd: Date){
    const { appointments } = appointmentRoom


  }

  private async verifyBrokerIsAvailable(
    brokerId: string,
    appointmentStart: Date,
    appointmentEnd: Date
  ) {
    const brokerAppointments = await this.appointmentRepository.getByUserId(
      brokerId
    );

    if (!brokerAppointments) {
      return;
    }

    const isOverlap = brokerAppointments.some((appointment) =>
      this.isAppointmentOverlap(appointment, appointmentStart, appointmentEnd)
    );

    if (isOverlap) {
      throw new Error(ErrorMessages.BROKER_BUSY(brokerId));
    }
  }

  private isAppointmentOverlap(
    appointment: AppointmentType,
    start: Date,
    end: Date
  ): boolean {
    return (
      appointment.appointmentStart < end && appointment.appointmentEnd > start
    );
  }

  private verifyAndReturnDates(appointmentStart: Date, appointmentEnd: Date){
    if (!(appointmentStart instanceof Date)) {
      appointmentStart = new Date(appointmentStart);
    }

    if (!(appointmentEnd instanceof Date)) {
      appointmentEnd = new Date(appointmentEnd);
    }

    if (
      !(appointmentStart instanceof Date) ||
      !(appointmentEnd instanceof Date)
    ) {
      throw new Error(ErrorMessages.INVALID_DATE());
    }

    return {verifiedAppointmentStart: appointmentStart, verifiedAppointmentEnd: appointmentEnd}
  }

  private verifyAppointmentDuration(
    appointmentStart: Date,
    appointmentEnd: Date
  ) {
    const timeDifference =
      appointmentEnd.getTime() - appointmentStart.getTime();
    const minutesDifference = timeDifference / (1000 * 60);

    if (minutesDifference < AppointmentDuration.MIN_MINUTES) {
      throw new Error(
        ErrorMessages.MIN_DURATION_EXCEEDED(AppointmentDuration.MIN_MINUTES)
      );
    }

    if (minutesDifference > AppointmentDuration.MAX_MINUTES) {
      throw new Error(
        ErrorMessages.MAX_DURATION_EXCEEDED(AppointmentDuration.MAX_MINUTES)
      );
    }
  }
}
