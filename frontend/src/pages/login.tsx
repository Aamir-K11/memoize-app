import Button from "../components/button";
import classes from "./login.module.css";

const Login = () => {
    return (
    <div className={classes['login-container']}>
        <form className={classes['login-form']}>
            <input type="email" id="email" name="email"></input>
            <input type="password" id="password" name="password"></input>
            <Button text="Login" onClick={(event: React.MouseEvent<HTMLButtonElement>) => console.log("Login") }/>
        </form>
    </div>);
}

export default Login;