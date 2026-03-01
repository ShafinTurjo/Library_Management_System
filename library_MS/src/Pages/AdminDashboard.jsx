import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/AdminDashboard.css";

function StatCard({ title, value, sub }) {
  return (
    <div className="adStatCard">
      <div className="adStatTitle">{title}</div>
      <div className="adStatValue">{value}</div>
      {sub ? <div className="adStatSub">{sub}</div> : null}
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");


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
    if (user && String(user.role || "").toLowerCase() !== "admin") {
      navigate("/member-dashboard");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const recent = [
    { id: 1, type: "Issue", userId: "u102", book: "Clean Code", date: "2026-03-01" },
    { id: 2, type: "Return", userId: "u205", book: "The Pragmatic Programmer", date: "2026-03-01" },
    { id: 3, type: "Add Book", userId: "admin", book: "Database Systems", date: "2026-02-28" },
    { id: 4, type: "Issue", userId: "u009", book: "Discrete Mathematics", date: "2026-02-28" },
  ];

  return (
    <div className="adWrap">
      <aside className="adSidebar">
        <div className="adBrand">
          <div className="adLogo">📚</div>
          <div>
            <div className="adBrandTitle">Library Admin</div>
            <div className="adBrandSub">Dashboard</div>
          </div>
        </div>

        <nav className="adNav">
          <button
            className={`adNavItem ${active === "overview" ? "active" : ""}`}
            onClick={() => setActive("overview")}
          >
            Overview
          </button>
          <button
            className={`adNavItem ${active === "books" ? "active" : ""}`}
            onClick={() => setActive("books")}
          >
            Manage Books
          </button>
          <button
            className={`adNavItem ${active === "users" ? "active" : ""}`}
            onClick={() => setActive("users")}
          >
            Manage Users
          </button>
          <button
            className={`adNavItem ${active === "transactions" ? "active" : ""}`}
            onClick={() => setActive("transactions")}
          >
            Transactions
          </button>
          <button
            className={`adNavItem ${active === "settings" ? "active" : ""}`}
            onClick={() => setActive("settings")}
          >
            Settings
          </button>
        </nav>

        <div className="adSideFooter">
          <div className="adUserBox">
            <div className="adUserName">{user?.name || "Admin"}</div>
            <div className="adUserRole">{user?.role || "Admin"}</div>
          </div>

          <button className="adLogout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      
      <main className="adMain">
        <header className="adTopbar">
          <div>
            <div className="adHello">Welcome back, {user?.name || "Admin"} 👋</div>
            <div className="adMuted">Here’s what’s happening in your library today.</div>
          </div>

          <div className="adTopActions">
            <button className="adBtn" onClick={() => setActive("books")}>
              + Add Book
            </button>
            <button className="adBtnGhost" onClick={() => setActive("users")}>
              + Add User
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="adContent">
          <div className="adGrid">
            <StatCard title="Total Books" value="1,248" sub="Across all categories" />
            <StatCard title="Issued Today" value="23" sub="+4 vs yesterday" />
            <StatCard title="Overdue" value="8" sub="Needs attention" />
            <StatCard title="Active Members" value="312" sub="Last 30 days" />
          </div>

          <div className="adPanels">
            <div className="adPanel">
              <div className="adPanelHead">
                <div className="adPanelTitle">Quick Actions</div>
                <div className="adPanelSub">Common admin tasks</div>
              </div>

              <div className="adActions">
                <button className="adAction" onClick={() => navigate("/add-book")}>
                  ➕ Add Book
                  <span>Insert new book into catalog</span>
                </button>

                <button className="adAction" onClick={() => navigate("/issue-book")}>
                  📤 Issue Book
                  <span>Issue a book to a member</span>
                </button>

                <button className="adAction" onClick={() => navigate("/return-book")}>
                  📥 Return Book
                  <span>Process book returns</span>
                </button>

                <button className="adAction" onClick={() => setActive("transactions")}>
                  🧾 View Transactions
                  <span>Recent issues/returns</span>
                </button>
              </div>
            </div>

            <div className="adPanel">
              <div className="adPanelHead">
                <div className="adPanelTitle">Recent Activity</div>
                <div className="adPanelSub">Latest actions in the system</div>
              </div>

              <div className="adTableWrap">
                <table className="adTable">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>User</th>
                      <th>Book</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r) => (
                      <tr key={r.id}>
                        <td>{r.type}</td>
                        <td>{r.userId}</td>
                        <td>{r.book}</td>
                        <td>{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="adNote">
                🔧 Next step: API connect করে real data আনতে পারিস।
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;