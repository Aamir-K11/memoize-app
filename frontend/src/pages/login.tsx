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
        axios.post('http://localhost:5000/auth/login', {
            email: data.Email,
            password: data.Password
        }
        ).then((res: any => {
            console.log(res.data);
        }).catch((err: any)=>{
            console.log(err.response.data.message);
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