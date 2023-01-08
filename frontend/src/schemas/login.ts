import { object, string, number, date, InferType } from 'yup';

const loginSchema = object({
  email: string().email().required("Email is required"),
  password: string().min(8, "Password length should not be less than 8").required("Password is required")
}).required();

export default loginSchema;