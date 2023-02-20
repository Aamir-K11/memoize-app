import classes from './button.module.css';

type ButtonProps = {text: string} & React.InputHTMLAttributes<HTMLButtonElement>;

const Button = ({text, onClick, className}: ButtonProps) => {
    return <div>
        <button onClick = {onClick} className={className ? `${classes['primary-button']} ${className}` : classes['primary-button']}>{text}</button>
         </div>;
}

export default Button;