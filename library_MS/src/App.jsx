import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import Register from "./Pages/register";
import Login from "./Pages/Login";
import Book from "./Pages/Book";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2500);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Book />} />

        <Route path="/admin-dashboard" element={<Home />} /> 
        <Route path="/member-dashboard" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;