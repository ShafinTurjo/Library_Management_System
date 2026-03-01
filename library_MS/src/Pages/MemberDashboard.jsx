import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/MemberDashboard.css";

function StatCard({ title, value, sub }) {
  return (
    <div className="mdStatCard">
      <div className="mdStatTitle">{title}</div>
      <div className="mdStatValue">{value}</div>
      {sub ? <div className="mdStatSub">{sub}</div> : null}
    </div>
  );
}

function MemberDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard"); 
  const [search, setSearch] = useState("");

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!user) navigate("/login");
    if (user && String(user.role || "").toLowerCase() === "admin") {
      navigate("/admin-dashboard");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", available: true },
    { id: 2, title: "Database Systems", author: "Elmasri & Navathe", category: "Database", available: true },
    { id: 3, title: "Discrete Mathematics", author: "Rosen", category: "Math", available: false },
    { id: 4, title: "The Pragmatic Programmer", author: "Hunt & Thomas", category: "Programming", available: true },
  ];

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  const issuedBooks = [
    { id: 1, title: "Clean Code", issueDate: "2026-02-25", dueDate: "2026-03-10", status: "Issued" },
    { id: 2, title: "Discrete Mathematics", issueDate: "2026-02-20", dueDate: "2026-03-05", status: "Overdue" },
  ];

  const libraryCard = {
    cardNo: "LC-10021",
    userId: user?.userId || "u001",
    name: user?.name || "Member",
    issueDate: "2026-01-01",
    expiryDate: "2027-01-01",
    status: "Active",
  };

  return (
    <div className="mdLayout">
      <aside className="mdSidebar">
        <div className="mdBrand">
          <div className="mdLogo">📚</div>
          <div>
            <div className="mdBrandTitle">Member Panel</div>
            <div className="mdBrandSub">{user?.name || "Member"}</div>
          </div>
        </div>

        <nav className="mdNav">
          <button
            className={`mdNavItem ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`mdNavItem ${active === "booklist" ? "active" : ""}`}
            onClick={() => setActive("booklist")}
          >
            Book List
          </button>

          <button
            className={`mdNavItem ${active === "card" ? "active" : ""}`}
            onClick={() => setActive("card")}
          >
            Library Card
          </button>
        </nav>

        <div className="mdSideFooter">
          <div className="mdUserBox">
            <div className="mdUserName">{user?.name || "Member"}</div>
            <div className="mdUserRole">{user?.role || "Member"}</div>
          </div>

          <button className="mdLogout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="mdMain">
        <header className="mdTopbar">
          <div>
            <div className="mdHello">
              {active === "dashboard" && "Dashboard"}
              {active === "booklist" && "Book List"}
              {active === "card" && "Library Card"}
            </div>
            <div className="mdMuted">Welcome to your member dashboard.</div>
          </div>

          {active === "booklist" && (
            <input
              className="mdSearch"
              placeholder="Search by title / author / category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </header>

        {active === "dashboard" && (
          <section className="mdContent">
            <div className="mdGrid">
              <StatCard title="Issued Books" value={String(issuedBooks.length)} sub="Currently borrowed" />
              <StatCard title="Overdue" value="1" sub="Return ASAP" />
              <StatCard title="Due This Week" value="1" sub="Check due date" />
              <StatCard title="Card Status" value={libraryCard.status} sub={`Expires: ${libraryCard.expiryDate}`} />
            </div>

            <div className="mdPanel">
              <div className="mdPanelHead">
                <div>
                  <div className="mdPanelTitle">My Issued Books</div>
                  <div className="mdPanelSub">Track what you’ve borrowed</div>
                </div>
              </div>

              <div className="mdTableWrap">
                <table className="mdTable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks.map((b) => (
                      <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.issueDate}</td>
                        <td>{b.dueDate}</td>
                        <td>
                          <span className={`mdBadge ${b.status === "Overdue" ? "bad" : "ok"}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mdQuick">
                <button className="mdQuickBtn" onClick={() => setActive("booklist")}>
                  🔎 Browse books
                </button>
                <button className="mdQuickBtn" onClick={() => setActive("card")}>
                  🪪 View library card
                </button>
              </div>
            </div>
          </section>
        )}

        {active === "booklist" && (
          <section className="mdContent">
            <div className="mdPanel">
              <div className="mdPanelHead">
                <div>
                  <div className="mdPanelTitle">Available Books</div>
                  <div className="mdPanelSub">Search and view all books</div>
                </div>
              </div>

              <div className="mdTableWrap">
                <table className="mdTable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.length === 0 ? (
                      <tr>
                        <td className="mdEmpty" colSpan="4">No books found.</td>
                      </tr>
                    ) : (
                      filteredBooks.map((b) => (
                        <tr key={b.id}>
                          <td>{b.title}</td>
                          <td>{b.author}</td>
                          <td>{b.category}</td>
                          <td>
                            <span className={`mdBadge ${b.available ? "ok" : "bad"}`}>
                              {b.available ? "Available" : "Not Available"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mdNote">
                🔧 Next step: API connect করে DB থেকে real book list আনবে।
              </div>
            </div>
          </section>
        )}

        {active === "card" && (
          <section className="mdContent">
            <div className="mdCardBox">
              <div className="mdCardTop">
                <div className="mdCardTitle">Library Card</div>
                <span className={`mdBadge ${libraryCard.status === "Active" ? "ok" : "bad"}`}>
                  {libraryCard.status}
                </span>
              </div>

              <div className="mdCardGrid">
                <div className="mdCardItem">
                  <div className="mdCardLabel">Card No</div>
                  <div className="mdCardValue">{libraryCard.cardNo}</div>
                </div>

                <div className="mdCardItem">
                  <div className="mdCardLabel">User ID</div>
                  <div className="mdCardValue">{libraryCard.userId}</div>
                </div>

                <div className="mdCardItem">
                  <div className="mdCardLabel">Name</div>
                  <div className="mdCardValue">{libraryCard.name}</div>
                </div>

                <div className="mdCardItem">
                  <div className="mdCardLabel">Issue Date</div>
                  <div className="mdCardValue">{libraryCard.issueDate}</div>
                </div>

                <div className="mdCardItem">
                  <div className="mdCardLabel">Expiry Date</div>
                  <div className="mdCardValue">{libraryCard.expiryDate}</div>
                </div>
              </div>

              <div className="mdNote">
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MemberDashboard;