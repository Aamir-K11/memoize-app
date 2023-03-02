import { object, string } from 'yup';

const loginSchema = object().shape({
  Email: string().email().required("Email is required"),
  Password: string().min(8, 'Password length should not be less than 8').required("Password is required")
});

export default loginSchema;