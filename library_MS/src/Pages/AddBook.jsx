import React, { useEffect, useState } from "react";
import "../Css/Book.css";

function AddBook() {
  const API = "http://localhost/DBProject";

  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");

  const [book, setBook] = useState({
    title: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    fetch(`${API}/getAuthors.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setAuthors(data.data);
        else alert(data.message || "Failed to load authors");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorId) {
      alert("Please select an Author!");
      return;
    }

    try {
      const selectedAuthor = authors.find(
        (a) => String(a.AuthorID) === String(authorId)
      );
      const authorName = selectedAuthor?.AuthorName || "";

      // 1) Add Book
      const res1 = await fetch(`${API}/addBook.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          category: book.category,
          status: book.status,
          author: authorName, // Books.author field compatibility
        }),
      });

      const text1 = await res1.text();
      let data1;
      try {
        data1 = JSON.parse(text1);
      } catch {
        alert("addBook.php JSON দিচ্ছে না। Console দেখো।");
        console.log("addBook RAW:", text1);
        return;
      }

      if (data1.status !== "success" || !data1.bookId) {
        alert(data1.message || "Book add failed!");
        console.log(data1);
        return;
      }

      const newBookId = data1.bookId;

      // 2) Link BookAuthor
      const res2 = await fetch(`${API}/addBookAuthor.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          BookID: newBookId,
          AuthorID: Number(authorId),
        }),
      });

      const text2 = await res2.text();
      let data2;
      try {
        data2 = JSON.parse(text2);
      } catch {
        alert("addBookAuthor.php JSON দিচ্ছে না। Console দেখো।");
        console.log("addBookAuthor RAW:", text2);
        return;
      }

      if (data2.status === "success") {
        alert("Book added + Author linked ✅");
        setBook({ title: "", category: "", status: "" });
        setAuthorId("");
      } else {
        alert(data2.message || "Author link failed!");
        console.log(data2);
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred!");
    }
  };

  return (
    <div className="book-page">
      <div className="book-header">
        <h1>Add New Book</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="filter-section"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.AuthorID} value={a.AuthorID}>
              {a.AuthorName}
            </option>
          ))}
        </select>

        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          required
        >
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

        <select
          name="status"
          value={book.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <button
          type="submit"
          className="status available"
          style={{ cursor: "pointer", border: "none", padding: "10px 20px" }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;