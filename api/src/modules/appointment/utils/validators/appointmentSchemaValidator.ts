import * as yup from 'yup';
import { AppointmentDuration } from '../appointmentDuration';

export const appointmentSchemaValidator = yup.object().shape({
  appointmentStart: yup.date().required().min(new Date(), 'Appointment must be in the future'),
  appointmentEnd: yup
    .date()
    .required()
    .min(yup.ref('appointmentStart'), 'End date must be after start date')
    .test(
      'is-duration-valid',
      `Appointment duration must be between ${AppointmentDuration.MIN_MINUTES} and ${AppointmentDuration.MAX_MINUTES} minutes`,
      function (value: Date) {
        const { appointmentStart } = this.parent;
        const durationInMinutes = Math.floor((value.getTime() - appointmentStart) / (1000 * 60));

        return durationInMinutes >= AppointmentDuration.MIN_MINUTES && durationInMinutes <= AppointmentDuration.MAX_MINUTES;
      }
    ),
  client: yup.string().required('Client is required'),
  broker: yup.string().required('Broker is required'),
  room: yup.string().required('Room is required')
});
