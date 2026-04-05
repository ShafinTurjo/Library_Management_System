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
      const response = await fetch("http://localhost:8080/DBProject/login.php", {
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

     
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        alert("Server response JSON na. Console e raw response dekhun.");
        return;
      }

      if (!response.ok || data?.status === "error") {
        alert(data?.message || `HTTP ${response.status}`);
        return;
      }

      
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: String(userId).trim(), role: data?.role || "member" })
        );
      }

      alert("Login Successful!");

      const role = String(data?.user?.role || data?.role || "").toLowerCase();

      if (role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/member-dashboard", { replace: true });
      }
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
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