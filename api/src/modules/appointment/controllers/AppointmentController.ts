import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { IAppointmentService } from "../services/AppointmentServiceInterface";
import { Request, Response } from "express";
import { appointmentDatesSchema } from "../utils/validators/appointmentDatesValidator";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { appointmentSchemaValidator } from "../utils/validators/appointmentSchemaValidator";
import { IAppointmentController } from "./AppointmentControllerInterface";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ErrorMessages } from "../../../utils/errorHandler/errorMessages";
import { UpdateAppointmentDTO } from "../dtos/UpdateAppointmentDTO";
import { removeUndefinedParams } from "../../../utils/removeUndefinedParams/removeUndefinedParams";

export class AppointmentController implements IAppointmentController{
  constructor(private readonly appointmentService: IAppointmentService) {}

  async getAll(req: Request, res: Response) {
    try {
      const { page, limit, appointmentStart, appointmentEnd, client, broker, room } = req.query;
      const query = removeUndefinedParams({page, limit, appointmentStart, appointmentEnd, client, broker, room})
      const appointments = await this.appointmentService.getAll(query);
      res
        .status(StatusCode.OK)
        .json(appointments);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async getByDates(req: Request, res: Response) {
    try {
      const appointmentDates = req.body;
      await appointmentDatesSchema.validate(appointmentDates);
      const { appointmentStart, appointmentEnd } = appointmentDates;

      const appointments = await this.appointmentService.getByDates(
        appointmentStart,
        appointmentEnd
      );
      res
        .status(StatusCode.OK)
        .json(appointments);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.getById(id);
      res
        .status(StatusCode.OK)
        .json(appointment);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointments = await this.appointmentService.getByUserId(id);
      res.status(StatusCode.OK).json(appointments);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      if(authorization){
        const token = authorization.split(' ')[1]
        const payload = jwt.decode(token) as JwtPayload

        if(payload && payload._doc && payload._doc.role == 'broker'){
          res.status(StatusCode.BAD_REQUEST).json(ErrorMessages.ROLE_NOT_ALLOWED('broker'))
        }
      }

      const appointmentData: CreateAppointmentDTO = req.body;
      await appointmentSchemaValidator.validate(appointmentData, {
        abortEarly: false,
      });

      const newAppointment = await this.appointmentService.create(
        appointmentData
      );
      
      res
        .status(StatusCode.CREATED)
        .json(newAppointment);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointmentData: UpdateAppointmentDTO = req.body;

      const updatedAppointment = await this.appointmentService.update(
        id,
        appointmentData
      );
      res
        .status(StatusCode.OK)
        .json(updatedAppointment);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedAppointment = await this.appointmentService.softDelete(id);
      res
        .status(StatusCode.OK)
        .json(deletedAppointment);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }
}
