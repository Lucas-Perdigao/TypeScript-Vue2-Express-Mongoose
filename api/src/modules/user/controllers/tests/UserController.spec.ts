import { fakeUser } from "../../__mocks__/fakeUser";
import { fakeUserService } from "../../__mocks__/fakeUserService";
import { UserController } from "../UserController";
import { mockRequest, mockResponse } from "../../../../__mocks __/fakeRequestResponse";
import { StatusCode } from "../../../../utils/statusCodes/StatusCode";
import { ErrorMessages } from "../../../../utils/errorHandler/errorMessages";

const userController = new UserController(fakeUserService)
const req = mockRequest()
const res = mockResponse()

describe("UserController", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      await userController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(Array.from({ length: 10 }, () => fakeUser))
    })

    it("should return all filtered users", async () => {
      req.params.role = 'broker'
      await userController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(Array.from({ length: 10 }, () => ({...fakeUser, role: 'broker'})))
    })

    it("should return a status code 200", async () => {
      await userController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "getAll").mockImplementationOnce(() => Promise.reject(ErrorMessages.NOT_FOUND('Users')))
      await userController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getByEmail", () => {
    it("should return a user", async () => {
      req.query.email = fakeUser.email
      await userController.getByEmail(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeUser)
    })

    it("should return a status code 200", async () => {
      await userController.getByEmail(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "getByEmail").mockImplementationOnce(() => Promise.reject(ErrorMessages.NOT_FOUND('User')))
      await userController.getByEmail(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getById", () => {
    it("should return a user", async () => {
      req.params.id = fakeUser._id
      await userController.getById(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeUser)
    })

    it("should return a status code 200", async () => {
      await userController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "getById").mockImplementationOnce(() => Promise.reject(ErrorMessages.NOT_FOUND('User')))
      await userController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("create", () => {
    it("should return a user", async () => {
      req.body = fakeUser
      await userController.create(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeUser)
    })

    it("should return a status code 200", async () => {
      await userController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 400", async () => {
      jest.spyOn(fakeUserService, "create").mockImplementationOnce(() => Promise.reject({name: "ValidationError", errors: [{message: "error"}]}))
      await userController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "create").mockImplementationOnce(() => Promise.reject(ErrorMessages.CANNOT_CREATE('User')))
      await userController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("update", () => {
    it("should return a user", async () => {
      req.params.id = fakeUser._id
      req.body = fakeUser
      await userController.update(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeUser)
    })

    it("should return a status code 200", async () => {
      await userController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "update").mockImplementationOnce(() => Promise.reject(ErrorMessages.CANNOT_UPDATE('User')))
      await userController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("softDelete", () => {
    it("should return a user", async () => {
      req.params.id = fakeUser._id
      await userController.softDelete(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeUser)
    })

    it("should return a status code 200", async () => {
      await userController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeUserService, "softDelete").mockImplementationOnce(() => Promise.reject(ErrorMessages.CANNOT_DELETE('User')))
      await userController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })
})