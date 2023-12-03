import { fakeUserData, fakeUpdatedUser, fakeDeletedUser, fakeObjectId } from "../../__mocks__/fakeUserData";
import { fakeUserModel } from "../../__mocks__/fakeUserModel";
import { UserRepository } from "../UserRepository";

const userRepository = new UserRepository(fakeUserModel)

describe("UserRepository", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      const users = await userRepository.getAll()

      expect(users).toEqual(fakeUserData)
    })
  })
})