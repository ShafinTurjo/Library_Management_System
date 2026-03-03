import { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";

export default function Author() {
  const API = "http://localhost/DBProject";

  const [authors, setAuthors] = useState([]);
  const [AuthorName, setAuthorName] = useState("");
  const [Country, setCountry] = useState("");
  const [Bio, setBio] = useState("");

  const loadAuthors = async () => {
    const res = await fetch(`${API}/getAuthors.php`);
    const data = await res.json();
    if (data.status === "success") setAuthors(data.data);
    else alert(data.message || "Failed to load authors");
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const addAuthor = async () => {
    if (!AuthorName.trim()) return alert("Author name required!");

    const res = await fetch(`${API}/addAuthor.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        AuthorName: AuthorName.trim(),
        Country: Country.trim() || null,
        Bio: Bio.trim() || null,
      }),
    });

    const data = await res.json();
    if (data.status === "success") {
      setAuthorName("");
      setCountry("");
      setBio("");
      loadAuthors();
      alert("Author Added ✅");
    } else {
      alert(data.message || "Add failed");
      console.log(data);
    }
  };

  const deleteAuthor = async (AuthorID) => {
    if (!confirm("Delete this author?")) return;

    const res = await fetch(`${API}/deleteAuthor.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ AuthorID }),
    });

    const data = await res.json();
    if (data.status === "success") {
      loadAuthors();
      alert("Author Deleted ✅");
    } else {
      alert(data.message || "Delete failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Author Management</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <input
            value={AuthorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author Name *"
            style={{ padding: 8, minWidth: 220 }}
          />
          <input
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            style={{ padding: 8, minWidth: 180 }}
          />
          <input
            value={Bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            style={{ padding: 8, minWidth: 260 }}
          />
          <button onClick={addAuthor} style={{ padding: "8px 14px" }}>
            Add
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", maxWidth: 1000 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Bio</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {authors.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No authors found
                  </td>
                </tr>
              ) : (
                authors.map((a) => (
                  <tr key={a.AuthorID}>
                    <td>{a.AuthorID}</td>
                    <td>{a.AuthorName}</td>
                    <td>{a.Country || "-"}</td>
                    <td>{a.Bio || "-"}</td>
                    <td>
                      <button onClick={() => deleteAuthor(a.AuthorID)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}