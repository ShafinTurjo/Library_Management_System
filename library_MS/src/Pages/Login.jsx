import { Link } from "react-router-dom";
import "../Css/Login.css";

function Login() {
  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1 className="loginTitle">Welcome Back</h1>
        <p className="loginSubtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Email Address"
          className="loginInput"
        />

        <input
          type="password"
          placeholder="Password"
          className="loginInput"
        />

        <button className="loginButton">Login</button>

        <p className="bottomText">
          Don’t have an account?{" "}
          <Link to="/Register" className="registerLink">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;