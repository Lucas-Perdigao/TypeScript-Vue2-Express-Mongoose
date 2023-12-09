import { fakeInvalidObjectId, fakeObjectId } from "../../../../__mocks __/fakeObjectId";
import { fakeRoom } from "../../__mocks__/fakeRoom";
import { fakeRoomModel } from "../../__mocks__/fakeRoomModel";
import { roomConfig } from "../../utils/roomConfig";
import { RoomRepository } from "../RoomRepository";

const roomRepository = new RoomRepository(fakeRoomModel);

describe("RoomRepository", () => {
  describe("getAll", () => {
    it("should return all rooms", async () => {
      const rooms = await roomRepository.getAll({});

      expect(rooms).toEqual(Array.from({ length: roomConfig.MAX_ROOMS }, () => fakeRoom));
    });

    it("should call the find method of the roomModel", async () => {
      await roomRepository.getAll({});

      expect(fakeRoomModel.find).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a room", async () => {
      const Room = await roomRepository.getById(fakeRoom._id);

      expect(Room).toEqual(fakeRoom);
    });
  });

  describe("create", () => {
    it("should return a room", async () => {
      const Room = await roomRepository.create(fakeRoom);

      expect(Room).toEqual(fakeRoom);
    });

    it("should call the create method of the roomModel", async () => {
      await roomRepository.create(fakeRoom);

      expect(fakeRoomModel.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should return a room", async () => {
      const Room = await roomRepository.update(fakeObjectId, fakeRoom);

      expect(Room).toEqual(fakeRoom);
    });

    it("should call the findByIdAndUpdate method of the roomModel", async () => {
      await roomRepository.update(fakeObjectId, fakeRoom);

      expect(fakeRoomModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it("should throw an error if the id is invalid", async () => {
      await expect(
        roomRepository.update(fakeInvalidObjectId, fakeRoom)
      ).rejects.toThrow();
    });
  });

  describe("softDelete", () => {
    it("should return a room", async () => {
      const Room = await roomRepository.softDelete(fakeObjectId);

      expect(Room).toEqual(fakeRoom);
    });

    it("should call the findByIdAndUpdate method of the roomModel", async () => {
      await roomRepository.softDelete(fakeObjectId);

      expect(fakeRoomModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(roomRepository.softDelete(invalidId)).rejects.toThrow();
    });
  });
});