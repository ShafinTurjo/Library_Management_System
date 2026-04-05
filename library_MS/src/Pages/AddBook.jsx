import { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";

export default function AddBook() {
  const API = "http://localhost:8080/DBProject";

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const res = await fetch(`${API}/getAuthors.php`);
      const data = await res.json();
      console.log("getAuthors:", data);

      if (data.status === "success") {
        setAuthors(data.data || []);
      } else {
        alert(data.message || "Failed to load authors");
      }
    } catch (err) {
      console.error(err);
      alert("Author load failed: " + err.message);
    }
  };

  const handleAddBook = async () => {
    if (!title || !author || !category || !status) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${API}/addBook.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          category,
          status,
        }),
      });

      const data = await res.json();
      console.log("addBook:", data);

      if (data.status === "success") {
        alert("Book added successfully ✅");
        setTitle("");
        setAuthor("");
        setCategory("");
        setStatus("");
      } else {
        alert(data.message || "Add failed");
      }
    } catch (err) {
      console.error(err);
      alert("API error: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: 20 }}>
        <h2>Add New Book</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: 8 }}
          />

          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ padding: 8 }}
          >
            <option value="">Select Author</option>
            {authors.map((a) => (
              <option key={a.AuthorID} value={a.AuthorName}>
                {a.AuthorName}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: 8 }}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="BBA">BBA</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: 8 }}
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>

          <button onClick={handleAddBook} style={{ padding: "10px 14px" }}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}