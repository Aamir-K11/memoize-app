import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../interfaces/form";
import classes from './input.module.css';

type InputProps = {
    label: Path<IFormInput>;
    register: UseFormRegister<IFormInput>;
    required: boolean;
};

const Input = ({ label, register, required }: InputProps) => (
    <>
      <label className={classes["__form-label"]}>{label}</label>
      <input className={classes["__form-input"]} {...register(label, { required })} />
    </>
  );

export default Input;