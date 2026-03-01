import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Book from "./Pages/Book";
import AddBook from "./Pages/AddBook";
import IssueBook from "./Pages/IssueBook";
import ReturnBook from "./Pages/ReturnBook";
import TransactionList from "./Pages/TransactionList";
import IssueCard from "./Pages/IssueCard";
import LibraryCardList from "./Pages/LibraryCardList";
import LibraryCardList from "./Pages/AdminDashboard";
import LibraryCardList from "./Pages/MemberDashboard";
import LibraryCardList from "./Pages/LibraryCardList";
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

        <Route path="/addbook" element={<AddBook />} />
        <Route path="/issuebook" element={<IssueBook />} />
        <Route path="/returnbook" element={<ReturnBook />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/issuecard" element={<IssueCard />} />
        <Route path="/librarycards" element={<LibraryCardList />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/books" element={<Book />} />
        <Route path="/library-card" element={<LibraryCard />} />
      </Routes>
    </Router>
  );
}

export default App;