import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { RoomDTO } from "../dtos/RoomDTO";
import { IRoomService } from "../services/RoomServiceInterface";
import { Request, Response } from 'express'
import { roomSchemaValidator } from "../utils/roomSchemaValidator";

export class RoomController {
  constructor(private readonly roomService: IRoomService){}

  async getAll(req: Request, res: Response){
    try {
      const rooms = await this.roomService.getAll()
      res.status(StatusCode.OK).json(rooms)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
  }

  async getById(req: Request, res: Response){
    try {
      const { id } = req.params
      const room = await this.roomService.getById(id)
      res.status(StatusCode.OK).json(room)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
  }

  async create(req: Request, res: Response){
    try {
      const roomData: RoomDTO = req.body
      await roomSchemaValidator.validate(roomData, { abortEarly: false})
      const newRoom = await this.roomService.create(roomData)
      res.status(StatusCode.CREATED).json(newRoom)
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
  }

  async update(req: Request, res: Response){
    try {
      const { id } = req.params
      const roomData: RoomDTO = req.body;

      const updatedroom = await this.roomService.update(id, roomData);
      res.status(StatusCode.OK).json(updatedroom);
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
  }

  async softDelete(req: Request, res: Response){
    try {
      const { id } = req.params
      const deletedRoom = await this.roomService.softDelete(id);
      res
        .status(StatusCode.OK)
        .json(deletedRoom);
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
  }
}