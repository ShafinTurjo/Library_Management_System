import React, { useState, useEffect } from "react";
import "../Css/Book.css";

function Book() {
  
  const [booksData, setBooksData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  useEffect(() => {
    fetch("http://localhost:8080/DBProject/getBooks.php")
      .then((res) => res.json())
      .then((data) => setBooksData(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const categories = ["All", ...new Set(booksData.map(book => book.category))];

  const filteredBooks = booksData.filter(book =>
    (category === "All" || book.category === category) &&
    (book.title.toLowerCase().includes(search.toLowerCase()) ||
     book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="book-page">

      
      <div className="top-banner">
        <div className="banner-left">
          <h1>Library Management System</h1>
          <p>Manage your university books easily</p>
        </div>

        <div className="banner-right">
          <img src="/books.png" alt="Books" />
        </div>
      </div>

  
      <div className="book-header">
        <h1>📚 University Library</h1>
        <p>Search and filter books by department</p>
      </div>

      
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
                      book.status === "Available"
                        ? "status available"
                        : "status issued"
                    }
                  >
                    {book.status}
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
