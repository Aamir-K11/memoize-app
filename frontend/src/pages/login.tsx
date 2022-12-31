import React, { useState } from "react";
import Button from "../components/button";
import TextInput from "../components/TextInput";
import classes from "./login.module.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (e: React.SyntheticEvent) => {
            e.preventDefault();
            console.log(e);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
    <div className={classes['login-container']}>
        <form onSubmit = {onSubmitHandler} className={classes['login-form']}>
            <TextInput type="email" id="email" name="email" value={email} onChange={handleEmailChange}/>
            <TextInput type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            <Button text="Login" onClick={(event: React.MouseEvent<HTMLButtonElement>) => console.log("Login") }/>
        </form>
    </div>);
}

export default Login;