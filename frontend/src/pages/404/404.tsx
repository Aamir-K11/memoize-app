import classes from '../404/404.module.css';
import emoji from '../../assets/sad.svg';

const NotFound = () => {
    return (<div className={classes.banner}>
      <img src={emoji} className={classes.emoji}/> 
      <h1>Error 404!</h1>
      <h1>Page not found</h1>
    </div>);
}

export default NotFound;