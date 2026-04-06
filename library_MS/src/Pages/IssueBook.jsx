import React, { useState } from "react";
import "../Css/Book.css"; 
import AdminSidebar from "../Components/AdminSidebar";

function IssueBook() {
  const [issue, setIssue] = useState({ userId: "", bookId: "", days: 7 });

  const handleIssue = (e) => {
    e.preventDefault();
    fetch("http://localhost/mssqlproject/issueBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(issue),
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        alert("Book issued successfully!");
      } else {
        alert(data.message || "Error issuing book!");
      }
    });
  };

  return (
    <div className="book-page">
      <AdminSidebar />
      <h1>📅 Issue a Book</h1>
      <form onSubmit={handleIssue} className="filter-section" style={{flexDirection: "column"}}>
        <input type="text" placeholder="Member User ID" onChange={(e) => setIssue({...issue, userId: e.target.value})} required />
        <input type="number" placeholder="Book ID" onChange={(e) => setIssue({...issue, bookId: e.target.value})} required />
        <input type="number" placeholder="Issue for how many days?" value={issue.days} onChange={(e) => setIssue({...issue, days: e.target.value})} />
        <button type="submit" className="status available">Issue Book</button>
      </form>
    </div>
  );
}
export default IssueBook;