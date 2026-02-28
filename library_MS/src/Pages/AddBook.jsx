import React, { useState } from "react";
import "../Css/Book.css"; 

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    status: "" 
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost/mssqlproject/addBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status === "success") {
        alert("Book added successfully!!"); 
        setBook({ title: "", author: "", category: "", status: "" }); 
      } else {
        alert("error occurred!"); 
      }
    })
    .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="book-page">
      <div className="book-header">
        <h1>Add New Book</h1>
      </div>
      <form onSubmit={handleSubmit} className="filter-section" style={{flexDirection: "column", alignItems: "center"}}>
        <input type="text" name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author Name" value={book.author} onChange={handleChange} required />
        
        <select name="category" value={book.category} onChange={handleChange} required>
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="BBA">BBA</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Database">Database</option>
          <option value="Math">Math</option>
          <option value="Civil">Civil</option>
          <option value="Ipe">Ipe</option>
          <option value="Textile">Textile</option>
          <option value="Architecture">Architecture</option>
        </select>

        
        <select name="status" value={book.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <button type="submit" className="status available" style={{cursor: "pointer", border: "none", padding: "10px 20px"}}>Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;