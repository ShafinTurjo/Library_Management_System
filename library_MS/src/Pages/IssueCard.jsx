import React, { useState } from "react";
import "../Css/Book.css";

function IssueCardForm() {
  const [formData, setFormData] = useState({
    userId: "",
    cardNumber: "",
    issueDate: "",
    expiryDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/mssqlproject/issueCard.php", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || data.error);
        setFormData({ userId: "", cardNumber: "", issueDate: "", expiryDate: "" });
      });
  };

  return (
    <div className="book-page">
      <div className="book-header">
        <h1> Issue New Library Card</h1>
      </div>
      <div className="card-page-container" style={{maxWidth: "500px", margin: "0 auto"}}>
        <form onSubmit={handleSubmit} className="issue-form">
          <input 
            type="text" placeholder="User ID (e.g. tas123)" 
            value={formData.userId}
            onChange={(e) => setFormData({...formData, userId: e.target.value})}
            required 
          />
          <input 
            type="text" placeholder="Card Number (e.g. LIB-2026-001)" 
            value={formData.cardNumber}
            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
            required 
          />
          <label>Issue Date:</label>
          <input 
            type="date" 
            value={formData.issueDate}
            onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
            required 
          />
          <label>Expiry Date:</label>
          <input 
            type="date" 
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            required 
          />
          <button type="submit" className="issue-btn">Issue Card</button>
        </form>
      </div>
    </div>
  );
}

export default IssueCardForm;