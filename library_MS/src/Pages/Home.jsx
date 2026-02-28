import { Link } from "react-router-dom";
import "../Css/Home.css";

function Home() {
  return (
    <div className="container">
      <div className="content">
        <div className="left">
          <div className="icon">📚</div>
          <h1 className="title">
            Organize, manage and track your books easily.
          </h1>
          <p className="subtitle">
            A complete system to manage university library records, track issued books, and handle returns.
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
          
          <img src="/Book.png" alt="Library Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Home;