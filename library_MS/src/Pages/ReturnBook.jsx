import React, { useState } from "react";
import "../Css/Book.css";

function ReturnBook() {
  const [transId, setTransId] = useState("");

  const handleReturn = (e) => {
    e.preventDefault();
    fetch("http://localhost/mssqlproject/returnBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId: transId }),
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        alert(`Book returned successfully! Fine: ${data.fine} TK`);
      } else {
        alert(data.message || "Error returning book!");
      }
    })
    .catch(err => console.error("Error:", err));
  };

  return (
    <div className="book-page">
      <h1> Return Book & Calculate Fine</h1>
      <form onSubmit={handleReturn} className="filter-section" style={{flexDirection: "column", gap: "15px"}}>
        <input 
          type="number" 
          placeholder="Enter Transaction ID" 
          value={transId} 
          onChange={(e) => setTransId(e.target.value)} 
          required 
        />
        <button type="submit" className="status available">Process Return</button>
      </form>
    </div>
  );
}

export default ReturnBook;