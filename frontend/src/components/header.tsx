import Button from './button';
import logo from '../assets/memoize.png';
import classes from './header.module.css';
const Header = () => {
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <img src={logo} className={classes.logo}/>
            <ul className={classes['nav-links']}>   
                <li>Home</li>
                <li>About</li>
                <li><Button text="Sign Up" className={classes['custom-signup-btn']}onClick={()=>{}}/></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;