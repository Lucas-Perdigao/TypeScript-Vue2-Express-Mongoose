import { fakeObjectId, fakeObjectIds } from "../../../../__mocks __/fakeObjectId"
import { fakeRoom } from "../../../room/__mocks__/fakeRoom";
import { fakeRoomRepository } from "../../../room/__mocks__/fakeRoomRepository";
import { MongooseRoomType } from "../../../room/model/RoomModel";
import { fakeUser } from "../../../user/__mocks__/fakeUser";
import { fakeUserRepository } from "../../../user/__mocks__/fakeUserRepository";
import { MongooseUserType } from "../../../user/model/UserModel";
import { userConfig } from "../../../user/utils/userConfig";
import { fakeAppointment, endInThreeHours, startInTwoHours, endInFiveHours, endInTwentyMinutes, generateFakeCreateAppointment } from "../../__mocks__/fakeAppointment";
import { fakeAppointmentRepository } from "../../__mocks__/fakeAppointmentRepository";
import { AppointmentService } from "../AppointmentService";

const appointmentService = new AppointmentService(fakeAppointmentRepository, fakeUserRepository, fakeRoomRepository);

describe("AppointmentService", () => {
  describe("getAll", () => {
    it("should return all appointments", async () => {
      const appointments = await appointmentService.getAll({});

      expect(appointments).toEqual(Array.from({ length: 10 }, () => fakeAppointment));
    });

    it("should throw an error if no appointments are found", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve([]));

      await expect(appointmentService.getAll({})).rejects.toThrow();
    });
  });

  describe("getByDates", () => {
    it("should return all appointments during that time", async () => {
      const appointments = await appointmentService.getByDates(startInTwoHours, endInFiveHours);

      expect(appointments).toEqual(Array.from({ length: 5 }, () => fakeAppointment));
    });

    it("should throw an error if no appointment is found", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "getByDates")
        .mockImplementationOnce(() => Promise.resolve([]));

      await expect(appointmentService.getByDates(startInTwoHours, endInThreeHours)).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentService.getById(fakeAppointment.client);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should throw an error if no appointment is found", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(appointmentService.getById(fakeAppointment._id)).rejects.toThrow();
    });
  });

  describe("getByUserId", () => {
    it("should return all appointments with that user", async () => {
      const appointments = await appointmentService.getByUserId(fakeAppointment.client);

      expect(appointments).toEqual(Array.from({ length: 5 }, () => fakeAppointment));
    });

    it("should throw an error if no appointment is found", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "getByUserId")
        .mockImplementationOnce(() => Promise.resolve([]));

      await expect(appointmentService.getByUserId(fakeAppointment._id)).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours));

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should throw an error if the appointment duration is less than 30 minutes", async () => {
      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInTwentyMinutes))).rejects.toThrow();
    })

    it("should throw an error if the appointment duration more than 2 hours", async () => {
      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInFiveHours))).rejects.toThrow();
    })

    it("should throw an error if the client is not found", async () => {
      jest
        .spyOn(fakeUserRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));
    
      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours))).rejects.toThrow()
    });
    
    it("should throw an error if the broker is not found", async () => {
      jest
        .spyOn(fakeUserRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));
    
      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours))).rejects.toThrow();
    })
    
    it("should throw an error if the room is not found", async () => {
      jest
        .spyOn(fakeRoomRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));
    
      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours))).rejects.toThrow();
    });
    
    it("should throw an error if the appointment cannot be created", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours))).rejects.toThrow();
    });

    // it("should throw an error if the broker is at its daily appointments limit", async () => {
    //   // Simule a situação em que o corretor já atingiu o limite máximo de compromissos diários
    //   jest
    //     .spyOn(fakeUserRepository, "getById")
    //     .mockResolvedValueOnce({...fakeUser, dailyAppointments: 5 } as unknown as MongooseUserType);
  
    //   // Tente criar um novo compromisso
    //   await expect(appointmentService.create(generateFakeCreateAppointment(startInTwoHours, endInThreeHours))).rejects.toThrow();
    // });
  });

  describe("update", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentService.update(fakeObjectId, generateFakeCreateAppointment(startInTwoHours, endInThreeHours));

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should throw an error if the appointment cannot be updated", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        appointmentService.update(fakeObjectId, generateFakeCreateAppointment(startInTwoHours, endInThreeHours))
      ).rejects.toThrow();
    });
  });
  
  describe("softDelete", () => {
    it("should return a appointment", async () => {
      const appointment = await appointmentService.softDelete(fakeObjectId);

      expect(appointment).toEqual(fakeAppointment);
    });

    it("should throw an error if the appointment cannot be deleted", async () => {
      jest
        .spyOn(fakeAppointmentRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(appointmentService.softDelete(fakeObjectId)).rejects.toThrow();
    });
  });
});