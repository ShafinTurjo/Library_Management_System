import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#1e293b",
      color: "white",
      padding: "20px"
    }}>

      <h2>Library Admin</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>

        <li><Link to="/admin-dashboard">Dashboard</Link></li>

        <li><Link to="/books">Books</Link></li>

        <li><Link to="/authors">Authors</Link></li>

        <li><Link to="/addbook">Add Book</Link></li>

        <li><Link to="/issuebook">Issue Book</Link></li>

        <li><Link to="/returnbook">Return Book</Link></li>

        <li><Link to="/transactions">Transactions</Link></li>

        <li><Link to="/librarycards">Library Cards</Link></li>

      </ul>

    </div>
  );
}

export default AdminSidebar;