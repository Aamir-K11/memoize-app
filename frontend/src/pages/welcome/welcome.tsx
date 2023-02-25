import classes from "./welcome.module.css";
import welcome from "../../assets/welcome.png";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";

const Welcome = () => {
    return (<div className={classes.main}>
        <img src={welcome} className={classes.welcome}/> 
        <div className={classes["btn-group"]}>
             <Link to="/login"><Button text="Login" className={classes["custom-welcome-btn"]}/></Link>
             <Link to="/signup"><Button text="Signup" className={classes["custom-welcome-btn"]}/></Link>
        </div>
    </div>)
}

export default Welcome;