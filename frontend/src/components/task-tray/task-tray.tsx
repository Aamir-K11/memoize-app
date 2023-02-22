import Task from "../tasks/tasks";
import classes from './task-tray.module.css';

const TaskTray = () => {
    return (
        <div className={classes['__task-tray']}>
            <Task/>
            <Task/>
            <Task/>
        </div>
    );
}

export default TaskTray;