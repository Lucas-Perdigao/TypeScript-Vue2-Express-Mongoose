import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { IAppointmentService } from "../services/AppointmentServiceInterface";
import { Request, Response } from "express";
import { appointmentDatesSchema } from "../utils/validators/appointmentDatesValidator";
import { AppointmentDTO } from "../dtos/AppointmentDTO";
import { appointmentSchemaValidator } from "../utils/validators/appointmentSchemaValidator";
import { IAppointmentController } from "./AppointmentControllerInterface";

export class AppointmentController implements IAppointmentController{
  constructor(private readonly appointmentService: IAppointmentService) {}

  async getAll(req: Request, res: Response) {
    try {
      const appointments = await this.appointmentService.getAll();
      res
        .status(StatusCode.OK)
        .json(appointments);
    } catch (error: any) {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
        .json({ error: error.message });
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
        .json({ error: error.message });
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
        .json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const appointmentData: AppointmentDTO = req.body;
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
        .json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointmentData: AppointmentDTO = req.body;
      await appointmentSchemaValidator.validate(appointmentData, {
        abortEarly: false,
      });
      const updatedAppointment = await this.appointmentService.update(
        id,
        appointmentData
      );
      res
        .status(StatusCode.OK)
        .json(updatedAppointment);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
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
        .json({ error: error.message });
    }
  }
}
