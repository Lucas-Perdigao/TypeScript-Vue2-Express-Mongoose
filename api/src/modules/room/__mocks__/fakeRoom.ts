import { faker } from "@faker-js/faker";
import { fakeObjectId } from "../../../__mocks __/fakeObjectId"

export const generateFakeRoom = () => ({
  _id: fakeObjectId,
  name: `${faker.location}`,
  deletedAt: String(faker.date.past()),
  createdAt: String(faker.date.past()),
  updatedAt: String(faker.date.past()),
});

export const fakeRoom = generateFakeRoom();