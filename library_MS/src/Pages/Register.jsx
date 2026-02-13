import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Register to get started</p>

        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
        />

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

        <button style={styles.button}>Register</button>

        <p style={styles.bottom}>
          Already have an account?{" "}
          <Link to="/Login" style={styles.link}>
            Login
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
    width: "400px",
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
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#00c6ff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  bottom: {
    marginTop: "20px",
  },
  link: {
    color: "#00c6ff",
    fontWeight: "bold",
  },
};

export default Register;
