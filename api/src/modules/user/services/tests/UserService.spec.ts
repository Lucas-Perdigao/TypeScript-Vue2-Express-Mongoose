import { fakeObjectId } from "../../../../__mocks __/fakeObjectId"
import { fakeUser } from "../../__mocks__/fakeUser";
import { fakeUserRepository } from "../../__mocks__/fakeUserRepository";
import { UserService } from "../UserService";

const userService = new UserService(fakeUserRepository);

describe("UserService", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userService.getAll({});

      expect(users).toEqual(Array.from({ length: 10 }, () => fakeUser));
    });
    it("should throw an error if no users are found", async () => {
      jest
        .spyOn(fakeUserRepository, "getAll")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.getAll({})).rejects.toThrow();
    });
  });

  describe("getByEmail", () => {
    it("should return a user", async () => {
      const user = await userService.getByEmail(fakeUser.email);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if no user is found", async () => {
      jest
        .spyOn(fakeUserRepository, "getByEmail")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.getByEmail(fakeUser.email)).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a user", async () => {
      const user = await userService.getById(fakeUser._id);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if no user is found", async () => {
      jest
        .spyOn(fakeUserRepository, "getById")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.getById(fakeUser._id)).rejects.toThrow();
    });
  });

  describe("create", () => {
    it("should return a user", async () => {
      const user = await userService.create(fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the user cannot be created", async () => {
      jest
        .spyOn(fakeUserRepository, "create")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.create(fakeUser)).rejects.toThrow();
    });
    it("should hash the password", async () => {
      const fakeuserPassword = fakeUser.password;

      const user = await userService.create(fakeUser);

      expect(user.password).not.toEqual(fakeuserPassword);
    });
  });

  describe("update", () => {
    it("should return a user", async () => {
      const user = await userService.update(fakeObjectId, fakeUser);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the user cannot be updated", async () => {
      jest
        .spyOn(fakeUserRepository, "update")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        userService.update(fakeObjectId, fakeUser)
      ).rejects.toThrow();
    });
  });
  
  describe("softDelete", () => {
    it("should return a user", async () => {
      const user = await userService.softDelete(fakeObjectId);

      expect(user).toEqual(fakeUser);
    });
    it("should throw an error if the user cannot be deleted", async () => {
      jest
        .spyOn(fakeUserRepository, "softDelete")
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(userService.softDelete(fakeObjectId)).rejects.toThrow();
    });
  });
});