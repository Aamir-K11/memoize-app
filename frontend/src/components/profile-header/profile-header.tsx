import { IUser } from "../../@types/auth"

const ProfileHeader = ({firstname, lastname} : Partial<IUser>) => {

    return <h1>{`${firstname} ${lastname}`}</h1>
}

export default ProfileHeader;