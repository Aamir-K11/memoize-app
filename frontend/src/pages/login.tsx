import Button from "../components/button";

const Login = () => {
    return (
    <form>
        <input type="email" id="email" name="email"></input>
        <input type="password" id="password" name="password"></input>
        <Button text="Login" onClick={(event: React.MouseEvent<HTMLButtonElement>) => console.log("Login") }/>
    </form>);
}

export default Login;