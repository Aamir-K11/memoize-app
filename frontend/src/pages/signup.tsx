import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {useForm, SubmitHandler} from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '../components/input/input';
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

    const onSubmitHandler: SubmitHandler<SignUpInput> = (data) => {
        axios.post('http://localhost:5000/user/signup', {
            firstname: data.Firstname,
            lastname: data.Lastname,
            email: data.Email,
            password: data.Password
        }
        ).then((res: any) => {
           console.log("SignUp Success")
        }).catch((err: any)=>{
            console.log(err.response.data.message);
        })
    };

    return (
        <form onSubmit = {handleSubmit(onSubmitHandler)} className={classes['__form']}>
            <Input type="text" label="Firstname" register={register} error={errors.Firstname} required/>
            <Input type="text" label="Lastname" register={register} error={errors.Lastname} required/>
            <Input type="email" label="Email" register={register} error={errors.Email} required/>
            <Input type="password" label="Password" register={register} error={errors.Password} required/>
            <input type="submit"/>
            <p className={classes['__form-message']}>Already a user? <Link to="/login">Login</Link></p>
        </form>);
}

export default SignUp;