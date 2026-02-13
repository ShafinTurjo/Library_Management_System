import React, { useState } from "react";
import "../Css/Book.css";

function Book() {
  const booksData = [
    { id: 1, title: "Data Structures", author: "Mark Weiss", category: "CSE", available: "Available" },
    { id: 2, title: "Operating System", author: "Silberschatz", category: "CSE", available: "Issued" },
    { id: 3, title: "Electrical Machines", author: "Bimbhra", category: "EEE", available: "Available" },
    { id: 4, title: "Database System Concepts", author: "Silberschatz", category: "Database", available: "Available" },
    { id: 5, title: "Engineering Mathematics", author: "B.S. Grewal", category: "Engineering Math", available: "Available" },
    { id: 6, title: "Structural Analysis", author: "Hibbeler", category: "Civil", available: "Available" },
    { id: 7, title: "Thermodynamics", author: "Cengel", category: "Mechanical", available: "Issued" },
    { id: 8, title: "Industrial Engineering & Management", author: "O.P. Khanna", category: "IPE", available: "Available" },
    { id: 9, title: "Production Planning & Control", author: "K.K. Ahuja", category: "IPE", available: "Issued" },
    { id: 10, title: "Textile Fibre Science", author: "Joseph", category: "Textile", available: "Available" },
    { id: 11, title: "Principles of Marketing", author: "Philip Kotler", category: "BBA", available: "Available" },
    { id: 12, title: "Financial Management", author: "I.M. Pandey", category: "BBA", available: "Issued" },
    { id: 13, title: "Building Construction", author: "Arora & Bindra", category: "Architecture", available: "Available" }
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(booksData.map(book => book.category))];

  const filteredBooks = booksData.filter(book =>
    (category === "All" || book.category === category) &&
    (book.title.toLowerCase().includes(search.toLowerCase()) ||
     book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="book-page">

      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-left">
          <h1>Library Management System</h1>
          <p>Manage your university books easily</p>
        </div>

        <div className="banner-right">
          <img src="/books.png" alt="Books" />
        </div>
      </div>

      {/* Header */}
      <div className="book-header">
        <h1>📚 University Library</h1>
        <p>Search and filter books by department</p>
      </div>

      {/* Search + Filter */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="book-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                  <span
                    className={
                      book.available === "Available"
                        ? "status available"
                        : "status issued"
                    }
                  >
                    {book.available}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBooks.length === 0 && (
          <p className="no-data">No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Book;
