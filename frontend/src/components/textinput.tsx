import React from "react";
import classes from './textinput.module.css';

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    const {type, id, name, value, onChange, className, placeholder} = props;
    return (
        <input 
            type={type} 
            id={id} 
            name={name} 
            value={value} 
            onChange={onChange}  
            className = {className ? `${classes.input} ${className}` : classes.input}
        >
        </input>
    );
}

export default TextInput;