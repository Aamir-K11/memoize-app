import React, { useState } from "react";
import { AuthContextType, IUser } from "../@types/auth"

export const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;