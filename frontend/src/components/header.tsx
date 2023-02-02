import Button from './button';
import logo from '../assets/memoize.png';
import classes from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
    
    const URL = useLocation();
   
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <img src={logo} className={classes.logo}/>
            <ul className={classes['nav-links']}>   
                <li>Home</li>
                <li>About</li>
                { URL.pathname === "/login" && (<li><Link to='/signup'><Button text="Sign Up" className={classes['custom-signup-btn']}/></Link></li>) } 
                { URL.pathname === "/signup" && (<li><Link to='/login'><Button text="Log In" className={classes['custom-signup-btn']}/></Link></li>) } 
            </ul>
        </nav>
    </header>
    );
}

export default Header;