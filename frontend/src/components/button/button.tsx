import classes from './button.module.css';

type ButtonProps = React.InputHTMLAttributes<HTMLButtonElement>;

const Button = ({children, onClick, className}: ButtonProps) => {
    return <div>
        <button onClick = {onClick} className={className ? `${classes['primary-button']} ${className}` : classes['primary-button']}>{children}</button>
         </div>;
}

export default Button;