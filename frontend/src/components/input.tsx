import { Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import classes from './input.module.css';

interface InputProps<T extends FieldValues> {
    label: Path<T>;
    register: UseFormRegister<T>;
    required: boolean;
    type: string
};

const Input = <T extends FieldValues>({ type, label, register, required }: InputProps<T>) => (
    <>
      <input type={type} className={classes["__form-input"]} {...register(label, { required })} placeholder=" "/>
      <label className={classes["__form-label"]}>{label}</label>
    </>
  );

export default Input;