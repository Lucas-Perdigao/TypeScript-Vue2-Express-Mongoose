import { fakeObjectId } from "../../../../__mocks __/fakeObjectId"
import { fakeRoom } from "../../__mocks__/fakeRoom";
import { fakeRoomRepository } from "../../__mocks__/fakeRoomRepository";
import { roomConfig } from "../../utils/roomConfig";
import { RoomService } from "../RoomService";

const roomService = new RoomService(fakeRoomRepository);

describe("RoomService", () => {
  describe("getAll", () => {
    it("should return all rooms", async () => {
      const rooms = await roomService.getAll({});

      expect(rooms).toEqual(Array.from({ length: roomConfig.MAX_ROOMS }, () => fakeRoom));
    });
    
    it("should throw an error if no rooms are found", async () => {
      jest
        .spyOn(fakeRoomRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(roomService.getAll({})).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a room", async () => {
      const room = await roomService.getById(fakeRoom._id);

      expect(room).toEqual(fakeRoom);
    });

    it("should throw an error if no room is found", async () => {
      jest
        .spyOn(fakeRoomRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(roomService.getById(fakeRoom._id)).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a room", async () => {
      jest
      .spyOn(fakeRoomRepository, "getAll")
      .mockImplementationOnce(() => Promise.resolve([]));

      const room = await roomService.create(fakeRoom);

      expect(room).toEqual(fakeRoom);
    });

    it("should throw an error if the room cannot be created", async () => {
      jest
        .spyOn(fakeRoomRepository, "create")
        .mockImplementationOnce(() => Promise.reject(null));

      await expect(roomService.create(fakeRoom)).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should return a room", async () => {
      const room = await roomService.update(fakeObjectId, fakeRoom);

      expect(room).toEqual(fakeRoom);
    });

    it("should throw an error if the room cannot be updated", async () => {
      jest
        .spyOn(fakeRoomRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        roomService.update(fakeObjectId, fakeRoom)
      ).rejects.toThrow();
    });
  });
  
  describe("softDelete", () => {
    it("should return a room", async () => {
      const room = await roomService.softDelete(fakeObjectId);

      expect(room).toEqual(fakeRoom);
    });

    it("should throw an error if the room cannot be deleted", async () => {
      jest
        .spyOn(fakeRoomRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(roomService.softDelete(fakeObjectId)).rejects.toThrow();
    });
  });
});