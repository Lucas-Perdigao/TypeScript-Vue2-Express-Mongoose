import { faker } from "@faker-js/faker"
import { UserModel } from "../modules/user/model/UserModel"
import { MongoConnection } from "./MongoConnect"
import { RoomModel } from "../modules/room/model/RoomModel"

let seedIndex = 0

class MongoSeeder {
  static createUserClientSeed(index: number){
    faker.seed(index)
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'client',
    }
  }

  static createUserBrokerSeed(index: number){
    faker.seed(index++)
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'broker',
    }
  }

  static createRoomSeed(index: number){
    return {
      name: `Room ${index+1}`
    }
  }

  static async seedUsers() {
    try {
      const userClients = []
      const userBrokers = []

      for (let i = 0; i < 5; i++){
        userClients.push(this.createUserClientSeed(seedIndex))
        userBrokers.push(this.createUserBrokerSeed(seedIndex))
      }

      const allUsers = userClients.concat(userBrokers)
      const promises = allUsers.map(userData => UserModel.create(userData))
      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`User ${index + 1} created successfully`);
        } else {
          console.error(`Error creating user ${index + 1}: ${result.reason.message}`);
        }
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  static async seedRooms(){
    try {
      const rooms = Array(8).fill(0).map((_, index) => {
        return this.createRoomSeed(index)
      })

      const promises = rooms.map(roomData => RoomModel.create(roomData))

      const results = await Promise.allSettled(promises)

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Room ${index + 1} created successfully`);
        } else {
          console.error(`Error creating room ${index + 1}: ${result.reason.message}`);
        }
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  static async seedAll(){
    try {
      await this.seedUsers()
      console.log(' ')
      await this.seedRooms()
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
}

(async () => {
  MongoConnection.initialize()
  await MongoSeeder.seedAll()
  MongoConnection.finish()
})()