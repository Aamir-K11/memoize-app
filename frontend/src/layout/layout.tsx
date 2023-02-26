import React from 'react';
import Header from '../components/header/header';
import classes from './layout.module.css';

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
    <div className={classes.layout}>
        <Header/>
        <main>{children}</main>
    </div>);
    
}

export default Layout;