import { fakeRoom } from "../../__mocks__/fakeRoom";
import { fakeRoomService } from "../../__mocks__/fakeRoomService";
import { RoomController } from "../RoomController";
import { mockRequest, mockResponse } from "../../../../__mocks __/fakeRequestResponse";
import { StatusCode } from "../../../../utils/statusCodes/StatusCode";

const roomController = new RoomController(fakeRoomService)
const req = mockRequest()
const res = mockResponse()

describe("RoomController", () => {
  describe("getAll", () => {
    it("should return all rooms", async () => {
      await roomController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(Array.from({ length: 10 }, () => fakeRoom))
    })

    it("should return a status code 200", async () => {
      await roomController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeRoomService, "getAll").mockImplementationOnce(() => Promise.reject(null))
      await roomController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getById", () => {
    it("should return a room", async () => {
      req.params.id = fakeRoom._id
      await roomController.getById(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeRoom)
    })

    it("should return a status code 200", async () => {
      await roomController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeRoomService, "getById").mockImplementationOnce(() => Promise.reject(null))
      await roomController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("create", () => {
    it("should return a room", async () => {
      req.body = fakeRoom
      await roomController.create(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeRoom)
    })

    it("should return a status code 200", async () => {
      await roomController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 400", async () => {
      jest.spyOn(fakeRoomService, "create").mockImplementationOnce(() => Promise.reject({name: "ValidationError", errors: [{message: "error"}]}))
      await roomController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeRoomService, "create").mockImplementationOnce(() => Promise.reject({}))
      await roomController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("update", () => {
    it("should return a room", async () => {
      req.params.id = fakeRoom._id
      req.body = fakeRoom
      await roomController.update(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeRoom)
    })

    it("should return a status code 200", async () => {
      await roomController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeRoomService, "update").mockImplementationOnce(() => Promise.reject(null))
      await roomController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("softDelete", () => {
    it("should return a room", async () => {
      req.params.id = fakeRoom._id
      await roomController.softDelete(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeRoom)
    })

    it("should return a status code 200", async () => {
      await roomController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeRoomService, "softDelete").mockImplementationOnce(() => Promise.reject(null))
      await roomController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })
})