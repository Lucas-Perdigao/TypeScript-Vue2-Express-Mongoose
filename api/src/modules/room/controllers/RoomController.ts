import { StatusCode } from "../../../utils/statusCodes/StatusCode";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";
import { IRoomService } from "../services/RoomServiceInterface";
import { Request, Response } from 'express'
import { roomSchemaValidator } from "../utils/roomSchemaValidator";
import { UpdateRoomDTO } from "../dtos/UpdateRoomDTO";
import { removeUndefinedParams } from "../../../utils/removeUndefinedParams/removeUndefinedParams";
import { RoomQueryDTO } from "../dtos/RoomQueryDTO";
import { IRoomController } from "./RoomControllerInterface";

export class RoomController implements IRoomController {
  constructor(private readonly roomService: IRoomService){}

  async getAll(req: Request, res: Response){
    try {
      const { page, limit, name } = req.query;
      const query = removeUndefinedParams({page, limit, name})
      const rooms = await this.roomService.getAll(query as RoomQueryDTO)
      res.status(StatusCode.OK).json(rooms)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async getById(req: Request, res: Response){
    try {
      const { id } = req.params
      const room = await this.roomService.getById(id)
      res.status(StatusCode.OK).json(room)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async create(req: Request, res: Response){
    try {
      const roomData: CreateRoomDTO = req.body
      await roomSchemaValidator.validate(roomData, { abortEarly: false})
      const newRoom = await this.roomService.create(roomData)
      res.status(StatusCode.CREATED).json(newRoom)
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = error.errors.map((err: string) => ({ message: err }));
        res.status(StatusCode.BAD_REQUEST).json({ errors });
        return
      }

      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async update(req: Request, res: Response){
    try {
      const { id } = req.params
      const roomData: UpdateRoomDTO = req.body;

      const updatedroom = await this.roomService.update(id, roomData);
      res.status(StatusCode.OK).json(updatedroom);
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
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
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}