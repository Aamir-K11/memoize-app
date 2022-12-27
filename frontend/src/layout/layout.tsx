import React from 'react';

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
    <>
        <header><h2>Header</h2></header>
        <main>{children}</main>
    </>);
    
}

export default Layout;