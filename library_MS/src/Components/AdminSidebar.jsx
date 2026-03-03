import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 12px",
  margin: "6px 0",
  borderRadius: "8px",
  textDecoration: "none",
  color: "white",
  background: isActive ? "#334155" : "transparent",
});

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#0f172a",
        padding: "16px",
      }}
    >
      <h2 style={{ color: "white", marginTop: 0 }}>Library Admin</h2>

      <NavLink to="/admin-dashboard" style={linkStyle}>
        Dashboard
      </NavLink>
      <NavLink to="/books" style={linkStyle}>
        Books
      </NavLink>
      <NavLink to="/authors" style={linkStyle}>
        Authors
      </NavLink>
      <NavLink to="/addbook" style={linkStyle}>
        Add Book
      </NavLink>
      <NavLink to="/issuebook" style={linkStyle}>
        Issue Book
      </NavLink>
      <NavLink to="/returnbook" style={linkStyle}>
        Return Book
      </NavLink>
      <NavLink to="/transactions" style={linkStyle}>
        Transactions
      </NavLink>
      <NavLink to="/librarycards" style={linkStyle}>
        Library Cards
      </NavLink>
    </div>
  );
}