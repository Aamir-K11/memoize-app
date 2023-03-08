import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { AuthContextType } from "../../@types/auth";
import Task from "../tasks/tasks";
import classes from './task-tray.module.css';
import { AuthContext } from "../../context/auth-context";
import { ToDo } from "../../@types/todo";

const TaskTray = () => {

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

    return (
        <div className={classes['__task-tray']}>
            <Task/>
            <Task/>
            <Task/>
        </div>
    );
}

export default TaskTray;