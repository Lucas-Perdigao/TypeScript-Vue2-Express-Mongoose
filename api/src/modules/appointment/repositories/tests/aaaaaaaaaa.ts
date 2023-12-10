import { fakeInvalidObjectId, fakeObjectId } from "../../../../__mocks __/fakeObjectId";
import { fakeAppointment, fakeCreateAppointment } from "../../__mocks__/fakeAppointment";
import { fakeAppointmentModel } from "../../__mocks__/fakeAppointmentModel";
import { AppointmentRepository } from "../AppointmentRepository";

const appointmentRepository = new AppointmentRepository(fakeAppointmentModel);
jest.mock("mongoose");


describe("AppointmentRepository", () => {
  describe("getAll", () => {
    it("should return all appointments", async () => {
      const appointments = await appointmentRepository.getAll({});

      expect(appointments).toEqual(Array.from({ length: 10 }, () => fakeAppointment));
    });

    it("should call the find method of the appointmentModel", async () => {
      await appointmentRepository.getAll({});

      expect(fakeAppointmentModel.find).toHaveBeenCalled();
    });
  });

  describe("getByDates", () => {
    it("should return a appointment", async () => {
      const appointmentStart = new Date(fakeAppointment.appointmentStart)
      const appointmentEnd = new Date(fakeAppointment.appointmentEnd)
      
      const appointment = await appointmentRepository.getByDates(appointmentStart, appointmentEnd);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the find method of the appointmentModel", async () => {
      const appointmentStart = new Date(fakeAppointment.appointmentStart)
      const appointmentEnd = new Date(fakeAppointment.appointmentEnd)

      await appointmentRepository.getByDates(appointmentStart, appointmentEnd);

      expect(fakeAppointmentModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.getById(fakeAppointment._id);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the findOne method of the appointmentModel", async () => {
      await appointmentRepository.getById(fakeObjectId);

      expect(fakeAppointmentModel.findOne).toHaveBeenCalled();
    });
  });

  describe("getByUserId", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.getByUserId(fakeAppointment._id);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the find method of the appointmentModel", async () => {
      await appointmentRepository.getByUserId(fakeObjectId);

      expect(fakeAppointmentModel.find).toHaveBeenCalled();
    });
  });

  describe("getByRoomId", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.getByRoomId(fakeAppointment._id);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the find method of the appointmentModel", async () => {
      await appointmentRepository.getByRoomId(fakeObjectId);

      expect(fakeAppointmentModel.find).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.create(fakeCreateAppointment);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the create method of the appointmentModel", async () => {
      await appointmentRepository.create(fakeCreateAppointment);

      expect(fakeAppointmentModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.update(fakeObjectId, fakeCreateAppointment);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should call the findByIdAndUpdate method of the appointmentModel", async () => {
      await appointmentRepository.update(fakeObjectId, fakeCreateAppointment);

      expect(fakeAppointmentModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it("should throw an error if the id is invalid", async () => {
      await expect(
        appointmentRepository.update(fakeInvalidObjectId, fakeCreateAppointment)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentRepository.softDelete(fakeObjectId);

      expect(appointment).toEqual(fakeAppointment);
    });
    
    it("should call the findByIdAndUpdate method of the appointmentModel", async () => {
      await appointmentRepository.softDelete(fakeObjectId);

      expect(fakeAppointmentModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it("should throw an error if the id is invalid", async () => {
      await expect(appointmentRepository.softDelete(fakeInvalidObjectId)).rejects.toThrow();
    });
  });
});