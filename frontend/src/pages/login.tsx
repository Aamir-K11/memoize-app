import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./form.module.css";
import loginSchema from "../schemas/login";
import { yupResolver } from '@hookform/resolvers/yup';
import Input from "../components/input";

interface LoginFormInput {
    Email: string;
    Password: string;
};

const onSubmitHandler: SubmitHandler<LoginFormInput> = (data) => console.log(data);

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(loginSchema)
    }   
    );

    return (
        <form onSubmit = {handleSubmit(onSubmitHandler)} className={classes['__form']}>
            <Input type="email" label="Email" register={register} error={errors.Email} required/>
            <Input type="password" label="Password" register={register} required error={errors.Password}/>
            <input type="submit"/>
            <p className={classes['__form-message']}>Not registered yet? Signup</p>
        </form>);
}

export default Login;