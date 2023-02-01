import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./form.module.css";
import loginSchema from "../schemas/login";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../components/input";
import axios from "axios";

interface LoginFormInput {
    Email: string;
    Password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(loginSchema)
    }   
    );

    const onSubmitHandler: SubmitHandler<LoginFormInput> = (data) => {
        axios.post('http://localhost:8000/login', {
            email: data.Email,
            password: data.Password
        }).then((res) => {
            console.log(res);
        }).catch((err)=>{
            console.log(err.message);
        })
    };

    return (
        <form onSubmit = {handleSubmit(onSubmitHandler)} className={classes['__form']}>
            <Input type="email" label="Email" register={register} error={errors.Email} required/>
            <Input type="password" label="Password" register={register} required error={errors.Password}/>
            <input type="submit"/>
            <p className={classes['__form-message']}>Forgot Password?</p>
        </form>);
}

export default Login;