import { Link } from "react-router-dom";
import "../Css/Register.css";

function Register() {
  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">Create Account</h2>
        <p className="registerSubtitle">Register to get started</p>

        <input
          type="text"
          placeholder="Full Name"
          className="registerInput"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="registerInput"
        />

        <input
          type="password"
          placeholder="Password"
          className="registerInput"
        />

        <button className="registerButton">Register</button>

        <p className="bottomText">
          Already have an account?{" "}
          <Link to="/Login" className="loginLink">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
