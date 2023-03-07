import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { AuthContextType } from "../@types/auth";
import TaskTray from "../components/task-tray/task-tray";
import { AuthContext } from "../context/auth-context";
import { ToDo } from "../@types/todo";

const Dashboard = () => {

    const {user} = React.useContext(AuthContext) as AuthContextType;
    
    const [tasks, setTasks] = useState<ToDo[]>([]);

    useEffect(() => {
        axios
        .get('http://localhost:5000/todo', {
            headers: {
                'x-access-token' : user?.JWTtoken
            }
        })
        .then(tasks=> {
            setTasks(tasks.data.todos)
        })
        .catch(err => console.log(err))
      }, []);

    return <TaskTray/>
}

export default Dashboard;