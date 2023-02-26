import Button from '../button/button';
import logo from '../../assets/memoize.png';
import classes from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../../context/auth-context';
import { AuthContextType } from '../../@types/auth';
const Header = () => {
    
    const URL = useLocation();

    const {user} = React.useContext(AuthContext) as AuthContextType;
   
    return (
    <header className={classes.header}>
        <nav className={classes.nav}>
           <Link to={user?.isAuth ? "/dashboard" : "/"}><img src={logo} className={classes.logo}/></Link>
            <ul className={classes['nav-links']}>   
                <Link to={user?.isAuth ? "/dashboard" : "/"}><li>Home</li></Link>
                <li>About</li>
                {user?.isAuth && <li>{`${user.firstname} ${user.lastname}`}</li>}
                { !user && URL.pathname === "/login" && (<Link to='/signup'><li>Signup</li></Link>) } 
                { !user && URL.pathname === "/signup" && (<Link to='/login'><li>Login</li></Link>) } 
            </ul>
        </nav>
    </header>
    );
}

export default Header;