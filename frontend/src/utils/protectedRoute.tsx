import { Navigate } from "react-router";
import { Outlet } from "react-router";


const ProtectedRoute = ({guardStatement, redirectPath, children}: {guardStatement: boolean, redirectPath: string, children?: JSX.Element})=> {
    
    if(guardStatement) {
        return <Navigate to={redirectPath} replace/>
    }
    return children ? children : <Outlet /> ;
}

export default ProtectedRoute;