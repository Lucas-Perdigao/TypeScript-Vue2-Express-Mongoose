import { faker } from "@faker-js/faker";
import { fakeObjectId } from "../../../__mocks __/fakeObjectId"

export const generateFakeUser = () => ({
  _id: fakeObjectId,
  name: `${faker.person.prefix()} ${faker.person.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  dailyAppointments: 0,
  role: "broker",
  deletedAt: String(faker.date.past()),
  createdAt: String(faker.date.past()),
  updatedAt: String(faker.date.past()),
});

export const fakeUser = generateFakeUser();