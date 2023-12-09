import { fakeObjectId } from "../../../../__mocks __/fakeObjectId";
import { fakeUser } from "../../__mocks__/fakeUser";
import { fakeUserModel } from "../../__mocks__/fakeUserModel";
import { UserRepository } from "../UserRepository";

const userRepository = new UserRepository(fakeUserModel);

describe("UserRepository", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userRepository.getAll({});

      expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
    });
  });

  describe("getByEmail", () => {
    it("should return a user", async () => {
      const user = await userRepository.getByEmail(fakeUser.email);

      expect(user).toEqual(fakeUser);
    });
  });

  describe("getById", () => {
    it("should return a user", async () => {
      const user = await userRepository.getById(fakeUser._id);

      expect(user).toEqual(fakeUser);
    });
  });

  describe("create", () => {
    it("should return a user", async () => {
      const user = await userRepository.create(fakeUser);

      expect(user).toEqual(fakeUser);
    });
  });

  describe("update", () => {
    it("should return a user", async () => {
      const user = await userRepository.update(fakeObjectId, fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(
        userRepository.update(invalidId, fakeUser)
      ).rejects.toThrow();
    });
  });

  describe("addAppointment", () => {
    it("should return a user", async () => {
      const user = await userRepository.addAppointment(fakeUser._id);

      expect(user).toEqual(fakeUser);
    });
  });

  describe("softDelete", () => {
    it("should return a user", async () => {
      const user = await userRepository.softDelete(fakeObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should call, the findByIdAndUpdate method of the userModel", async () => {
      await userRepository.softDelete(fakeObjectId);

      expect(fakeUserModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it("should throw an error if the id is invalid", async () => {
      const invalidId = "invalidId";

      await expect(userRepository.softDelete(invalidId)).rejects.toThrow();
    });
  });
});