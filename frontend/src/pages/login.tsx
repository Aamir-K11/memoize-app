import { useForm, SubmitHandler } from "react-hook-form";
import inputClasses from '../components/textinput.module.css';
import classes from "./login.module.css";

type LoginFormInput = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>();

    const onSubmitHandler: SubmitHandler<LoginFormInput> = (data) => {
            console.log(data);
    }

    return (
    <div className={classes['login-container']}>
        <form onSubmit = {handleSubmit(onSubmitHandler)} className={classes['login-form']}>
            <input  type="email"    {...register("email", { required: 'Email is required', maxLength: 20 })} className = {inputClasses.input}/>
            {errors.email && <span>{errors.email.message}</span>}
            <input  type="password" {...register("password", { required: 'Password is required', maxLength: 20 })} className = {inputClasses.input}/>
            {errors.password && <span>{errors.password.message}</span>}
            <input type="submit"/>
        </form>
    </div>);
}

export default Login;