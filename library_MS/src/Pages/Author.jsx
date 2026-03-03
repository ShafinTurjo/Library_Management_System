import { useEffect, useState } from "react";
import AdminSidebar from "../Components/AdminSidebar";

function Author() {

  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const API = "http://localhost/DBProject";

  const loadAuthors = async () => {
    const res = await fetch(`${API}/getAuthors.php`);
    const data = await res.json();

    if (data.status === "success") {
      setAuthors(data.data);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const addAuthor = async () => {

    const res = await fetch(`${API}/addAuthor.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        AuthorName: name,
        Country: country
      })
    });

    const data = await res.json();

    if (data.status === "success") {
      alert("Author Added");
      setName("");
      setCountry("");
      loadAuthors();
    }

  };

  return (

    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ padding: "30px", flex: 1 }}>

        <h2>Author Management</h2>

        <input
          placeholder="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button onClick={addAuthor}>Add Author</button>

        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
            </tr>
          </thead>

          <tbody>
            {authors.map((a) => (
              <tr key={a.AuthorID}>
                <td>{a.AuthorID}</td>
                <td>{a.AuthorName}</td>
                <td>{a.Country}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Author;