import { Path, UseFormRegister } from "react-hook-form";
import { FieldError, FieldValues } from "react-hook-form/dist/types";
import classes from './input.module.css';

interface InputProps<T extends FieldValues> {
    label: Path<T>;
    register: UseFormRegister<T>;
    required: boolean;
    type: string;
    error: FieldError | undefined;
};

const Input = <T extends FieldValues>({ type, label, register, error, required }: InputProps<T>) => (
    <>
      <input type={type} className={classes["__form-input"]} {...register(label, { required })} placeholder=" " aria-invalid = {error ? "true" : "false"}/>
      <label className={classes["__form-label"]}>{label}</label>
      {error?.message && <p className={classes['__error-message']}>{`* ${error?.message}`}</p>}
    </>
  );

export default Input;