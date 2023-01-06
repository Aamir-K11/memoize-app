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
            <label className={inputClasses["custom-label"]}>
                <input  type="email" {...register("email", { required: 'Email is required', maxLength: 20 })} className = {inputClasses.input}/>
                <span className= {inputClasses["placeholder"]}>Email</span>
                {errors.email && <span className={inputClasses['error-message']}>{errors.email.message}</span>}
            </label>
            <label className={inputClasses["custom-label"]}>
                <input  type="password" {...register("password", { required: 'Password is required', maxLength: 20 })} className = {inputClasses.input}/>
                {errors.password && <span className={inputClasses['error-message']}>{errors.password.message}</span>}
                <span className= {inputClasses["placeholder"]}>Password</span>
            </label>
            <input type="submit"/>
        </form>
    </div>);
}

export default Login;