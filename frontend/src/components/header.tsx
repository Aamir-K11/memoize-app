import Button from './button';
import logo from '../assets/memoize.png';
import classes from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../context/auth-context';
import { AuthContextType } from '../@types/auth';
const Header = () => {
    
    const URL = useLocation();

    const {user} = React.useContext(AuthContext) as AuthContextType;
   
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <img src={logo} className={classes.logo}/>
            <ul className={classes['nav-links']}>   
                <Link to={user?.isAuth ? "/dashboard" : "/"}><li>Home</li></Link>
                <li>About</li>
                {user?.isAuth && <li>{`${user.firstname} ${user.lastname}`}</li>}
                { !user && URL.pathname === "/login" && (<li><Link to='/signup'><Button text="Sign Up" className={classes['custom-signup-btn']}/></Link></li>) } 
                { !user && URL.pathname === "/signup" && (<li><Link to='/login'><Button text="Log In" className={classes['custom-signup-btn']}/></Link></li>) } 
            </ul>
        </nav>
    </header>
    );
}

export default Header;