import classes from "./welcome.module.css";
import welcome from "../../assets/welcome.png";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";

const Welcome = () => {
    return (
    <div className={classes.main}>
        <img src={welcome} className={classes.welcome}/> 
        <div className={classes["btn-group"]}>
             <Link to="/login"><Button className={classes["custom-welcome-btn"]}>Login</Button></Link>
             <Link to="/signup"><Button className={classes["custom-welcome-btn"]}>Signup</Button></Link>
        </div>
    </div>)
}

export default Welcome;