import classes from './button.module.css';

type ButtonProps = {
    text: string;
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    className?: string;
}

const Button = ({text, onClick, className}: ButtonProps) => {
    return <div>
        <button onClick = {onClick} className={className ? className : classes['primary-button']}>{text}</button>
         </div>;
}

export default Button;