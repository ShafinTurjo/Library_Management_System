import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          type="email"
          placeholder="Email Address"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
        />

        <button style={styles.button}>Login</button>

        <p style={styles.bottomText}>
          Don’t have an account?{" "}
          <Link to="/Register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    textAlign: "center",
    color: "white",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "30px",
    opacity: 0.8,
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#00c6ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  bottomText: {
    marginTop: "25px",
    fontSize: "14px",
  },
  link: {
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
