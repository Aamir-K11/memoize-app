import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/button";
import inputClasses from '../components/textinput.module.css';
import classes from "./login.module.css";
import loginSchema from "../schemas/login";
import { yupResolver } from '@hookform/resolvers/yup';

type LoginFormInput = {
    email: string;
    password: string;
};

const onSubmitHandler: SubmitHandler<LoginFormInput> = (data) => console.log(data);

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(loginSchema)
    }   
    );

    return (
    <div className={classes['login-container']}>
        <form onSubmit = {handleSubmit(onSubmitHandler)} className={classes['login-form']}>
            <label className={inputClasses["custom-label"]}>
                <input  type="email" {...register("email")} className = {inputClasses.input}/>
                <span className= {inputClasses["placeholder"]}>Email</span>
                {errors.email && <span className={inputClasses['error-message']}>{errors.email?.message}</span>}
            </label>
            <label className={inputClasses["custom-label"]}>
                <input  type="password" {...register("password")} className = {inputClasses.input}/>
                {errors.password && <span className={inputClasses['error-message']}>{errors.password?.message}</span>}
                <span className= {inputClasses["placeholder"]}>Password</span>
            </label>
            <Button type="submit" text="Submit"/>
        </form>
    </div>);
}

export default Login;