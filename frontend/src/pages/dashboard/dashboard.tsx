import { IUser } from "../../@types/auth";
import ProfileHeader from "../../components/profile-header/profile-header";
import TaskTray from "../../components/task-tray/task-tray";

const Dashboard = ({user} : {user : IUser | null}) => {
    return (
    <>
        <ProfileHeader firstname = {user?.firstname} lastname = {user?.lastname}/>
        <TaskTray/>
    </>
    );
}

export default Dashboard;