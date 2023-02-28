import { Navigate } from "react-router";
import { IUser } from "../@types/auth";

const ProtectedRoute = ({user, redirectPath, children}: {user: IUser | null, redirectPath: string, children: JSX.Element})=> {
    if(!user) {
        return <Navigate to={redirectPath} replace/>
    }
    return children;
}

export default ProtectedRoute;