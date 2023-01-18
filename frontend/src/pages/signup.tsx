import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import Input from '../components/input';
import signUpSchema from '../schemas/signup';
import classes from './login.module.css';

interface SignUpInput {
    Firstname: String;
    Lastname: String;
    Email: String;
    Password: String;
}
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
        resolver: yupResolver(signUpSchema)
    }   
    );

    return (
        <form className={classes['__form']}>
            <Input type="text" label="Firstname" register={register} required/>
            <Input type="text" label="Lastname" register={register} required/>
            <Input type="email" label="Email" register={register} required/>
            <Input type="password" label="Password" register={register} required/>
            <input type="submit"/>
            <p className={classes['__form-message']}>Already a user? Login</p>
        </form>);
}

export default SignUp;