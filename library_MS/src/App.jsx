import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import Register from "./Pages/register";
import Login from "./Pages/Login";
import Book from "./Pages/Book";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return <Splash />;
  }

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;