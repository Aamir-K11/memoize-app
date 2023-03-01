import React from "react";
import { Navigate } from "react-router";
import { AuthContextType} from "../@types/auth";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = ({redirectPath, children}: {redirectPath: string, children: JSX.Element})=> {
    const {user} = React.useContext(AuthContext) as AuthContextType;
    
    if(!user) {
        return <Navigate to={redirectPath} replace/>
    }
    return children;
}

export default ProtectedRoute;