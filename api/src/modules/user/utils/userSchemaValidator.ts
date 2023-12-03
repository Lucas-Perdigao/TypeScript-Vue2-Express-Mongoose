import * as yup from 'yup';

export const userSchemaValidator = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters.'),
  email: yup.string().required('Email is required').email('Invalid email format.'),
  password: yup.string().required('Password is required.'),
  role: yup.string().required('Role is required.').oneOf(['client', 'broker'], 'Invalid role.'),
});
