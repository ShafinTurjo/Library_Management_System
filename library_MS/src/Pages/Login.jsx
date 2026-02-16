import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "../Css/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userId === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost/mssqlproject/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, password: password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Login Successful!");
        

        if (data.role === "Admin" || data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/member-dashboard");
        }
      } else {
        
        alert(data.message);
      }
    } catch (err) {
      
      console.log("Error:", err);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginCard" onSubmit={handleLogin}>
        <h1 className="loginTitle">Library Login</h1>
        <p className="loginSubtitle">Enter your ID and Password</p>

        <input
          type="text" 
          placeholder="User ID"
          className="loginInput"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="password" 
          placeholder="Password"
          className="loginInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="loginButton">Login</button>

        <p className="bottomText">
          New here? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;