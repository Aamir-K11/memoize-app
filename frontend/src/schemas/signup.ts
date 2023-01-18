import { object, string } from 'yup';

const signUpSchema = object().shape({
    Firstname: string().required(),
    Lastname:  string().required(),
    Email: string().email().required('Email is required'),
    Password: string().min(8, 'Password length should not be less than 8')
});

export default signUpSchema;