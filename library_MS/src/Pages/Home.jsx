import { Link } from "react-router-dom";
import "../Css/Home.css";

function Home() {
  return (
    <div className="container">
      <div className="content">

        <div className="left">
          <div className="icon">📚</div>

          <h1 className="title">
            Library Management System
          </h1>

          <p className="subtitle">
            Organize, manage and track your books easily.
          </p>

          <div className="buttonGroup">
            <Link to="/Login">
              <button className="primaryBtn">Login</button>
            </Link>

            <Link to="/Register">
              <button className="secondaryBtn">Register</button>
            </Link>
          </div>
        </div>

        <div className="right">
          <img src="/Book.png" alt="Books" />
        </div>

      </div>
    </div>
  );
}

export default Home;
