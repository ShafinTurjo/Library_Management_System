import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>📚 Welcome to Library Management System</h1>
      <p>Manage your books efficiently and easily.</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button style={{ marginLeft: "10px" }}>Register</button>
      </Link>
    </div>
  );
}

export default Home;