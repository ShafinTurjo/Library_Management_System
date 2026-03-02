import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost/mssqlproject/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        
        const userData = {
          name: data.name,
          role: data.role.toLowerCase()
        };
        localStorage.setItem("user", JSON.stringify(userData));

        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/member-dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1 className="loginTitle">Library Login</h1>
        <input type="text" placeholder="User ID" className="loginInput" onChange={(e) => setUserId(e.target.value)} />
        <input type="password" placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
        <button className="loginButton" onClick={handleLogin}>Login</button>
        <p className="bottomText">New? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
export default Login;