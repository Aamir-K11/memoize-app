import React from 'react';
import Header from '../components/header/header';

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
    <>
        <Header/>
        <main>{children}</main>
    </>);
    
}

export default Layout;