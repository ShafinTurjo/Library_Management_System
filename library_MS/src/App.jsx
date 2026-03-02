import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// পেজ ইমপোর্টসমূহ (সবগুলো ইউনিক নাম হতে হবে)
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
import LibraryCardList from "./Pages/LibraryCardList"; // এই নামটি একবারই থাকবে
import AdminDashboard from "./Pages/AdminDashboard";   
import MemberDashboard from "./Pages/MemberDashboard"; 

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

        {/* ড্যাশবোর্ড রাউটস */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/member-dashboard" element={<MemberDashboard />} />

        {/* কার্ড এবং অন্যান্য রাউটস */}
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/issuebook" element={<IssueBook />} />
        <Route path="/returnbook" element={<ReturnBook />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/issuecard" element={<IssueCard />} />
        <Route path="/card-history" element={<LibraryCardList />} />
      </Routes>
    </Router>
  );
}

export default App;