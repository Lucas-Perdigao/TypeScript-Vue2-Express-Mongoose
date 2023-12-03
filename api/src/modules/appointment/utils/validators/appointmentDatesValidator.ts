import * as yup from 'yup'

export const appointmentDatesSchema = yup.object().shape({
  appointmentStart: yup.date().required().typeError('Invalid start date'),
  appointmentEnd: yup.date().required().typeError('Invalid end date'),
});