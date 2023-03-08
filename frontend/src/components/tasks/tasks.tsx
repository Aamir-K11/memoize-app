import classes from './task.module.css';

type TaskType = {
    key: string,
    title: string
    priority: ['HIGH', 'MEDIUM', 'LOW']
}

const Task = ({key, title, priority} : TaskType) => {
    return (
    <div className={classes['__task-wrapper']}>
        <p>{title}</p>
        <p>{priority}</p>
    </div>
    );
}

export default Task;