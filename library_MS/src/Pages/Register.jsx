import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { name, email, userId, password, role };

    try {
      const response = await fetch("http://localhost/mssqlproject/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Registration Successful!");
        navigate("/Login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Server error. Please check if XAMPP is running.");
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">Create Account</h2>
        <p className="registerSubtitle">Register to get started</p>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" className="registerInput" 
            onChange={(e) => setName(e.target.value)} required />
          
          <input type="email" placeholder="Email Address" className="registerInput" 
            onChange={(e) => setEmail(e.target.value)} required />

          <input type="text" placeholder="User ID" className="registerInput" 
            onChange={(e) => setUserId(e.target.value)} required />

          <input type="password" placeholder="Password" className="registerInput" 
            onChange={(e) => setPassword(e.target.value)} required />

          <select className="registerInput" onChange={(e) => setRole(e.target.value)}>
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="registerButton">Register</button>
        </form>

        <p className="bottomText">
          Already have an account? <Link to="/Login" className="loginLink">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;