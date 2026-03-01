import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userId || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost/DBProject/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          userId: String(userId).trim(),
          password: String(password),
        }),
      });

      const text = await response.text();
      console.log("HTTP", response.status, "Response:", text);

      const data = JSON.parse(text);

      if (!response.ok) {
        alert(data.message || `HTTP ${response.status}`);
        return;
      }

      alert("Login Successful!");
      const role = (data?.user?.role || "").toLowerCase();
      navigate(role === "admin" ? "/admin-dashboard" : "/member-dashboard");
    } catch (err) {
      console.error(err);
      alert("Fetch failed: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
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

        <button type="button" className="loginButton" onClick={handleLogin}>
          Login
        </button>

        <p className="bottomText">
          New here? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;