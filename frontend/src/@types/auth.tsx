export interface IUser {
    firstname: string,
    lastname: string,
    JWTtoken: string,
    isAuth: boolean
}

export type AuthContextType = {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>> 
}