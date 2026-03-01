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
      // ✅ FIX: correct backend URL
      const response = await fetch("http://localhost/DBProject/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // ✅ If PHP returns error HTML or non-JSON, this helps debug
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response from server:", text);
        alert("Server returned non-JSON response. Check PHP error/logs.");
        return;
      }

      if (!response.ok) {
        // e.g. 400/409/500 etc.
        alert(result.message || `Request failed (HTTP ${response.status})`);
        return;
      }

      if (result.status === "success") {
        alert("Registration Successful!");
        navigate("/Login");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Fetch failed: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">Create Account</h2>
        <p className="registerSubtitle">Register to get started</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="registerInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="registerInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="User ID"
            className="registerInput"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="registerInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="registerInput"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="registerButton">
            Register
          </button>
        </form>

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