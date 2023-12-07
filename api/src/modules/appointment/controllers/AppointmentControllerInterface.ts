import { Request, Response } from "express";
import { AppointmentDTO } from "../dtos/CreateAppointmentDTO";

interface IAppointmentController {
  getAll(req: Request, res: Response): Promise<void>;
  getByDates(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  getByUserId(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  softDelete(req: Request, res: Response): Promise<void>;
}

export { IAppointmentController };
