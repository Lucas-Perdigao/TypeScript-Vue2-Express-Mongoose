import cron from 'node-cron'
import { CronMessages } from '../cronMessages';
import { AppointmentModel } from '../../modules/appointment/model/AppointmentModel';
import { MongoConnection } from '../../database/MongoConnect';

MongoConnection.initialize()
console.log(CronMessages.start('Clear Expired Appointments'))

cron.schedule('* * * * *', async () => {
  try {
    console.log(CronMessages.executeStart('Clear Expired Appointments'))
    const currentDate = new Date();

    await AppointmentModel.updateMany(
      { appointmentEnd: { $lt: currentDate }, deletedAt: null },
      { $set: { deletedAt: currentDate } }
    );

    console.log(CronMessages.executeEnd('Clear Expired Appointments'))
  } catch (error) {
    console.error(CronMessages.error('Clear Expired Appointments', error));
  }
});

//npx ts-node src/cronjobs/clearExpiredAppointments/clearExpiredAppointments.ts 