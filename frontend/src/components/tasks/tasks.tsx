import classes from './task.module.css';

const Task = () => {
    return (
    <div className={classes['__task-wrapper']}>
        <p>Sample Title</p>
        <p>URGENT</p>
    </div>
    );
}

export default Task;