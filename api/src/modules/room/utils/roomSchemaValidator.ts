import * as yup from 'yup';

export const roomSchemaValidator = yup.object({
  name: yup.string().required('Name is required'),
  appointment: yup.string()
});
