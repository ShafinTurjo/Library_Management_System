import { useEffect, useState } from "react";

export default function AddBook() {
  const API = "http://localhost:8080/DBProject";

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const res = await fetch(`${API}/getAuthors.php`);
      const data = await res.json();
      console.log("getAuthors response:", data);

      if (data.status === "success") {
        setAuthors(data.data || []);
      } else {
        alert(data.message || "Failed to load authors");
      }
    } catch (err) {
      console.error("Author fetch error:", err);
      alert("Author load failed: " + err.message);
    }
  };

  const handleAddBook = async () => {
    if (!title || !authorId || !department || !status) {
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
          authorId,
          department,
          status,
        }),
      });

      const data = await res.json();
      console.log("addBook response:", data);

      if (data.status === "success") {
        alert("Book added successfully");
        setTitle("");
        setAuthorId("");
        setDepartment("");
        setStatus("");
      } else {
        alert(data.message || "Add failed");
      }
    } catch (err) {
      console.error("Add book error:", err);
      alert("API error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add New Book</h1>

      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        <option value="">Select Author</option>
        {authors.map((a) => (
          <option key={a.AuthorID} value={a.AuthorID}>
            {a.AuthorName}
          </option>
        ))}
      </select>

      <br /><br />

      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select Department</option>
        <option value="CSE">CSE</option>
        <option value="EEE">EEE</option>
        <option value="BBA">BBA</option>
      </select>

      <br /><br />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>

      <br /><br />

      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}