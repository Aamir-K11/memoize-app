import React, { useState } from "react";
import Button from "../components/button";
import TextInput from "../components/TextInput";
import classes from "./login.module.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const onSubmitHandler = (e: React.SyntheticEvent) => {
            e.preventDefault();
            console.log(e);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
    <div className={classes['login-container']}>
        <form onSubmit = {onSubmitHandler} className={classes['login-form']}>
            <TextInput type="email" id="email" name="email" value={email} onChange={handleEmailChange} isError = {isEmailError} errorMessage = "Incorrect Email"/>
            <TextInput type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isError = {isPasswordError} errorMessage = "Incorrect Password"/>
            <Button text="Login" onClick={(event: React.MouseEvent<HTMLButtonElement>) => console.log("Login") }/>
        </form>
    </div>);
}

export default Login;