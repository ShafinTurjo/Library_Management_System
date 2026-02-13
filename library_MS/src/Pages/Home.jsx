import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>📚</div>

        <h1 style={styles.title}>
          Library Management System
        </h1>

        <p style={styles.subtitle}>
          Organize, manage and track your books easily.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/Login">
            <button style={styles.primaryBtn}>Login</button>
          </Link>

          <Link to="/Register">
            <button style={styles.secondaryBtn}>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  content: {
    textAlign: "center",
    animation: "fadeIn 1s ease-in-out"
  },
  icon: {
    fontSize: "60px",
    marginBottom: "20px"
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  subtitle: {
    fontSize: "18px",
    opacity: 0.85,
    marginBottom: "40px"
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center"
  },
  primaryBtn: {
    padding: "12px 35px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "#00c6ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s"
  },
  secondaryBtn: {
    padding: "12px 35px",
    borderRadius: "30px",
    border: "2px solid white",
    cursor: "pointer",
    background: "transparent",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s"
  }
};

export default Home;
