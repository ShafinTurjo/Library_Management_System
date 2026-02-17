import React, { useEffect, useState } from "react";
import "../Css/NavBar.css";
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost/mssqlproject/api/verify_token.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser({ userId: data.userId, role: data.role });
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">LibraryApp</a>
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/books">Books</a></li>
        <li><a href="/about">About</a></li>
        {user?.role === "admin" && (
          <li><a href="/admin">Admin Panel</a></li>
        )}
      </ul>

      <ul className="navbar-auth">
        {!user ? (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        ) : (
          <>
            <li>Hi, {user.userId}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;