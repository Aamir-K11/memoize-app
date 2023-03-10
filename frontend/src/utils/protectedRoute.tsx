import { Navigate } from "react-router";
import { Outlet } from "react-router";


const ProtectedRoute = ({guardStatement, redirectPath}: {guardStatement: boolean, redirectPath: string})=> {
    
    if(guardStatement) {
        return <Navigate to={redirectPath} replace/>
    }
    return <Outlet />;
}

export default ProtectedRoute;