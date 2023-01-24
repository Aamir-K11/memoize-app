import { object, string } from 'yup';

const loginSchema = object().shape({
  Email: string().email().required("Email is required"),
  Password: string().required("Password is required")
});

export default loginSchema;