import { endInThreeHours, fakeAppointment, startInTwoHours } from "../../__mocks__/fakeAppointment";
import { fakeAppointmentService } from "../../__mocks__/fakeAppointmentService";
import { AppointmentController } from "../AppointmentController";
import { mockRequest, mockResponse } from "../../../../__mocks __/fakeRequestResponse";
import { StatusCode } from "../../../../utils/statusCodes/StatusCode";
import { fakeToken } from "../../../../__mocks __/fakeToken";
import { AppointmentType } from "../../model/AppointmentModel";

const appointmentController = new AppointmentController(fakeAppointmentService)
const req = mockRequest()
const res = mockResponse()

describe("AppointmentController", () => {
  describe("getAll", () => {
    it("should return all appointments", async () => {
      await appointmentController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(Array.from({ length: 10 }, () => fakeAppointment))
    })

    it("should return all filtered appointments", async () => {
      req.query.broker = fakeAppointment.broker
      await appointmentController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(Array.from({ length: 10 }, () => ({...fakeAppointment, broker: fakeAppointment.broker})))
    })

    it("should return a status code 200", async () => {
      await appointmentController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "getAll").mockImplementationOnce(() => Promise.reject(null))
      await appointmentController.getAll(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getByDates", () => {
    it("should return all appointments by dates", async () => {
      const expectedAppointments = Array.from({ length: 3 }, () => fakeAppointment) as unknown as AppointmentType[]
      jest.spyOn(fakeAppointmentService, "getByDates").mockImplementationOnce(() => Promise.resolve(Array.from(expectedAppointments)))
      await appointmentController.getByDates(req, res)
      expect(res.json).toHaveBeenLastCalledWith(expectedAppointments)
    })

    it("should return a status code 200", async () => {
      await appointmentController.getByDates(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "getByDates").mockImplementationOnce(() => Promise.reject(new Error()))
      await appointmentController.getByDates(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getById", () => {
    it("should return a appointment", async () => {
      req.params.id = fakeAppointment._id
      await appointmentController.getById(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeAppointment)
    })

    it("should return a status code 200", async () => {
      await appointmentController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "getById").mockImplementationOnce(() => Promise.reject(null))
      await appointmentController.getById(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("getByUserId", () => {
    it("should return all appointments from user", async () => {
      const expectedAppointments = Array.from({ length: 3 }, () => fakeAppointment);
      jest.spyOn(fakeAppointmentService, "getByUserId").mockImplementationOnce(() => Promise.resolve(expectedAppointments as unknown as AppointmentType[]));
    
      await appointmentController.getByUserId(req, res);
    
      // Update the expectation to match the expected appointments
      expect(res.json).toHaveBeenLastCalledWith(expectedAppointments);
    });
    

    it("should return a status code 200", async () => {
      await appointmentController.getByUserId(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "getByUserId").mockImplementationOnce(() => Promise.reject(null))
      await appointmentController.getByUserId(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("create", () => {
    it("should return a appointment", async () => {
      req.body = fakeAppointment
      req.headers.authorization = fakeToken
      await appointmentController.create(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeAppointment)
    })

    it("should return a status code 200", async () => {
      await appointmentController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 400", async () => {
      jest.spyOn(fakeAppointmentService, "create").mockImplementationOnce(() => Promise.reject({name: "ValidationError", errors: [{message: "error"}]}))
      await appointmentController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "create").mockImplementationOnce(() => Promise.reject({}))
      await appointmentController.create(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("update", () => {
    it("should return a appointment", async () => {
      req.params.id = fakeAppointment._id
      req.body = fakeAppointment
      await appointmentController.update(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeAppointment)
    })

    it("should return a status code 200", async () => {
      await appointmentController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "update").mockImplementationOnce(() => Promise.reject(null))
      await appointmentController.update(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })

  describe("softDelete", () => {
    it("should return a appointment", async () => {
      req.params.id = fakeAppointment._id
      await appointmentController.softDelete(req, res)
      expect(res.json).toHaveBeenLastCalledWith(fakeAppointment)
    })

    it("should return a status code 200", async () => {
      await appointmentController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    })

    it("should return a status code 500", async () => {
      jest.spyOn(fakeAppointmentService, "softDelete").mockImplementationOnce(() => Promise.reject(null))
      await appointmentController.softDelete(req, res)
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR)
    })
  })
})