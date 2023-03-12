import { ToDo } from '../../@types/todo';
import classes from './task.module.css';

const Task = ({title, priority} : Omit<ToDo, '_id' | 'description'>) => {
    return (
    <div className={classes['__task-wrapper']}>
        <p>{title}</p>
        <p>{priority}</p>
    </div>
    );
}

export default Task;