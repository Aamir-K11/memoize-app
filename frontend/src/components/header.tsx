import Button from './button';
import logo from '../assets/memoize.png';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <img src={logo} className={classes.logo}/>
            <ul className={classes['nav-links']}>   
                <li>Home</li>
                <li>About</li>
                <li><Link to='/signup'><Button text="Sign Up" className={classes['custom-signup-btn']}/></Link></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;