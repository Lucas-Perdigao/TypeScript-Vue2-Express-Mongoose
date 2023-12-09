import cron from 'node-cron'
import { CronMessages } from '../utils/cronMessages';
import { UserModel } from '../../modules/user/model/UserModel';
import { MongoConnection } from '../../database/MongoConnect';

MongoConnection.initialize()
console.log(CronMessages.start('Reset Daily Appointments'))

cron.schedule('0 0 * * *', async () => {
  try {
    console.log(CronMessages.executeStart('Reset Daily Appointments'))
    await UserModel.updateMany({role: 'broker'}, {dailyAppointments: 0})
    console.log(CronMessages.executeEnd('Reset Daily Appointments'))

  } catch (error) {
    console.error(CronMessages.error('Reset Daily Appointments', error));
  }
});