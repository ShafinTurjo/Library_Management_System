import "../Css/Splash.css";

function Splash() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src="/L.png" alt="Logo" className="splash-logo" />
        <h1>Library Management System</h1>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Splash;
