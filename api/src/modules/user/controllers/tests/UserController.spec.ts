import { fakeUser } from "../../__mocks__/fakeUser";
import { fakeUserService } from "../../__mocks__/fakeUserService";
import { UserController } from "../UserController";
import { mockRequest, mockInvalidRequest, mockResponse } from "../../__mocks__/fakeRequestResponse";
import { StatusCode } from "../../../../utils/statusCodes/StatusCode";

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
      jest.spyOn(fakeUserService, "getAll").mockImplementationOnce(() => Promise.reject(null))
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
      jest.spyOn(fakeUserService, "getByEmail").mockImplementationOnce(() => Promise.reject(null))
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
      jest.spyOn(fakeUserService, "getById").mockImplementationOnce(() => Promise.reject(null))
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
      jest.spyOn(fakeUserService, "create").mockImplementationOnce(() => Promise.reject({}))
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
      jest.spyOn(fakeUserService, "update").mockImplementationOnce(() => Promise.reject(null))
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
      jest.spyOn(fakeUserService, "softDelete").mockImplementationOnce(() => Promise.reject(null))
      await userController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })
})