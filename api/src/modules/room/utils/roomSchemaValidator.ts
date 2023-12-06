import * as yup from 'yup';

export const roomSchemaValidator = yup.object({
  appointment: yup.string().required('Appointment is required'),
  isAvailable: yup.boolean().required('isAvailable is required')
});
