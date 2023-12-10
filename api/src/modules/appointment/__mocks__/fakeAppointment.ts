import { faker } from "@faker-js/faker";
import { fakeObjectId, fakeObjectIds } from "../../../__mocks __/fakeObjectId"

const now = new Date()
const twentyMinutesFromNow = new Date().setMinutes(now.getMinutes() + 20)
const twoHoursFromNow = new Date().setHours(now.getHours() + 2)
const threeHoursFromNow = new Date().setHours(now.getHours() + 3)
const fiveHoursFromNow = new Date().setHours(now.getHours() + 5)

export const startInTwoHours = new Date(twoHoursFromNow)
export const endInThreeHours = new Date(threeHoursFromNow)
export const endInFiveHours = new Date(fiveHoursFromNow)
export const endInTwentyMinutes = new Date(twentyMinutesFromNow)

export const generateFakeAppointment = () => ({
  _id: fakeObjectId,
  appointmentStart: startInTwoHours.toISOString(),
  appointmentEnd: endInThreeHours.toISOString(),
  client: fakeObjectIds[0],
  broker: fakeObjectIds[1],
  room: fakeObjectIds[2],
  deletedAt: String(faker.date.past()),
  createdAt: String(faker.date.past()),
  updatedAt: String(faker.date.past()),
});

export const generateFakeCreateAppointment = (start: Date, end: Date, broker?: string, room?: string) => ({
  appointmentStart: start,
  appointmentEnd: end,
  client: fakeObjectIds[0],
  broker: broker ? broker : fakeObjectIds[1],
  room: room ? room : fakeObjectIds[2],
}); 


export const fakeAppointment = generateFakeAppointment();


