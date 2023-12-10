import { isValidObjectId } from "mongoose";
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { IAppointmentRepository } from "../repositories/AppointmentRepositoryInterface";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { IAppointmentService } from "./AppointmentServiceInterface";
import { AppointmentType } from "../model/AppointmentModel";
import { AppointmentDuration } from "../utils/appointmentDuration";
import { IUserRepository } from "../../user/repositories/UserRepositoryInterface";
import { MongooseUserType } from "../../user/model/UserModel";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";
import { IRoomRepository } from "../../room/repositories/RoomRepositoryInterface";
import { VerifiedEntitiesDTO } from "../dtos/VerifiedEntitiesDTO";
import { MongooseRoomType } from "../../room/model/RoomModel";
import { userConfig } from "../../user/utils/userConfig";
import { AppointmentQueryDTO } from "../dtos/AppointmentQueryDTO";

export class AppointmentService implements IAppointmentService {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly userRepository: IUserRepository,
    private readonly roomRepositoty: IRoomRepository
  ) {}

  async getAll(query: AppointmentQueryDTO): Promise<AppointmentType[]> {
    const appointments = await this.appointmentRepository.getAll(query)

    if (!appointments || appointments.length === 0) {
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

    if (!appointments || appointments.length === 0) {
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

    if (!appointments || appointments.length === 0) {
      throw new Error(ErrorMessages.NOT_FOUND("Appointments"));
    }

    return appointments;
  }

  async create(appointment: CreateAppointmentDTO): Promise<AppointmentType> {
    const { appointmentStart, appointmentEnd, broker, client, room } = appointment;

    const start = new Date(appointmentStart)
    const end = new Date(appointmentEnd)

    this.verifyAppointmentDuration(start, end);

    const {appointmentRoom, brokerUser} = await this.verifyAndReturnEntities(room, client, broker)

    await this.verifyBrokerIsAvailable(brokerUser, start, end);

    await this.verifyRoomIsAvailable(appointmentRoom, start, end)

    const newAppointment = await this.appointmentRepository.create(appointment);

    if (!newAppointment) {
      throw new Error(ErrorMessages.CANNOT_CREATE("Appointment"));
    }

    await this.userRepository.addAppointment(brokerUser._id.toString());

    return newAppointment;
  }

  async update(id: string, appointmentData: UpdateAppointmentDTO): Promise<AppointmentType> {
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

  private async verifyBrokerIsAvailable(broker: MongooseUserType, appointmentStart: Date, appointmentEnd: Date): Promise<void> {
    if(broker.dailyAppointments >= userConfig.MAX_DAILY_APPOINTMENTS){
      throw new Error(ErrorMessages.MAX_DAILY_MEETINGS('Broker'))
    }

    const {_id} = broker
    appointmentStart = new Date(appointmentStart)
    appointmentEnd = new Date(appointmentEnd)
    const brokerAppointments = await this.appointmentRepository.getByUserId(
      _id.toString()
    );

    if (!brokerAppointments) {
      return;
    }

    const isOverlap = brokerAppointments.some((appointment) =>
      this.isAppointmentOverlap(appointment, appointmentStart, appointmentEnd)
    );

    if (isOverlap) {
      throw new Error(ErrorMessages.BROKER_BUSY(broker.name));
    }
  }

  private async verifyRoomIsAvailable(room: MongooseRoomType, appointmentStart: Date, appointmentEnd: Date){
    const {_id} = room
    const appointments = await this.appointmentRepository.getByRoomId(_id.toString())

    const overlappedAppointmentExists = appointments.some(appointment => this.isAppointmentOverlap(appointment, appointmentStart, appointmentEnd))

    if(overlappedAppointmentExists){
      throw new Error(ErrorMessages.ROOM_OCCUPIED())
    }
  }

  private isAppointmentOverlap(appointment: AppointmentType, start: Date, end: Date): boolean {
    return (
      appointment.appointmentStart <= end && appointment.appointmentEnd > start
    );
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

  private async verifyAndReturnEntities(roomId: string, clientId: string, brokerId: string): Promise<VerifiedEntitiesDTO> {
    const promises = [
      this.roomRepositoty.getById(roomId),
      this.userRepository.getById(clientId),
      this.userRepository.getById(brokerId),
    ];
  
    const [appointmentRoomResult, clientUserResult, brokerUserResult] = await Promise.allSettled(promises);
  
    if (appointmentRoomResult.status === 'rejected' || !appointmentRoomResult.value) {
      throw new Error(ErrorMessages.NOT_FOUND("Room"));
    }
  
    if (clientUserResult.status === 'rejected' || !clientUserResult.value) {
      throw new Error(ErrorMessages.NOT_FOUND("Client"));
    }
  
    if (brokerUserResult.status === 'rejected' || !brokerUserResult.value) {
      throw new Error(ErrorMessages.NOT_FOUND("Broker"));
    }
  
    const appointmentRoom = appointmentRoomResult.value;
    const brokerUser = brokerUserResult.value
  
    return { appointmentRoom, brokerUser: brokerUser as MongooseUserType };
  }
  
}
