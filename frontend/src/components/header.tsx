import Button from './button';
import classes from './header.module.css';
const Header = () => {
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <img src="../assets/memoize.svg" className={classes.logo}/>
            <ul className={classes['nav-links']}>   
                <li>Home</li>
                <li>About</li>
                <li><Button text="Sign Up" onClick={()=>{}}/></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;