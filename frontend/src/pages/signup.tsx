import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import Input from '../components/input';
import signUpSchema from '../schemas/signup';
import classes from './form.module.css';

interface SignUpInput {
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
}
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
        resolver: yupResolver(signUpSchema)
    }   
    );

    return (
        <form className={classes['__form']}>
            <Input type="text" label="Firstname" register={register} error={errors.Firstname} required/>
            <Input type="text" label="Lastname" register={register} error={errors.Lastname} required/>
            <Input type="email" label="Email" register={register} error={errors.Email} required/>
            <Input type="password" label="Password" register={register} error={errors.Password} required/>
            <input type="submit"/>
            <p className={classes['__form-message']}>Already a user? Login</p>
        </form>);
}

export default SignUp;