import React from "react";
import classes from './textinput.module.css';

type TextInputType = {errorMessage: string; isError: boolean} | React.InputHTMLAttributes<HTMLInputElement>

const TextInput = (props: TextInputType) => {

    const {errorMessage, isError, id, name, value, onChange, className, placeholder} = props;
    return (
        <>
        <input 
            type={type} 
            id={id} 
            name={name} 
            value={value} 
            onChange={onChange}  
            className = {className ? `${classes.input} ${className}` : classes.input}
        >
        </input>
        {isError && <p>{errorMessage}</p>}
        </>
        
    );
}

export default TextInput;