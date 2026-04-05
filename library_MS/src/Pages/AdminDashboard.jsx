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

  const [stats, setStats] = useState({
    totalBooks: 0,
    issuedToday: 0,
    overdue: 0,
    activeMembers: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (String(user.role || "").toLowerCase() !== "admin") {
      navigate("/member-dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost/DBProject/dashboard_stats.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setStats({
            totalBooks: data.data.totalBooks || 0,
            issuedToday: data.data.issuedToday || 0,
            overdue: data.data.overdue || 0,
            activeMembers: data.data.activeMembers || 0,
          });
        } else {
          console.error("Stats API error:", data.message);
        }
      })
      .catch((err) => {
        console.error("Stats fetch error:", err);
      })
      .finally(() => {
        setLoadingStats(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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
            Dashboard
          </button>

          <button className="adNavItem" onClick={() => navigate("/books")}>
            Books
          </button>

          <button className="adNavItem" onClick={() => navigate("/authors")}>
            Authors
          </button>

          <button className="adNavItem" onClick={() => navigate("/transactions")}>
            Transactions
          </button>

          <button className="adNavItem" onClick={() => navigate("/library-cards")}>
            Library Cards
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
            <button className="adBtn" onClick={() => navigate("/add-book")}>
              + Add Book
            </button>
            <button className="adBtnGhost" onClick={() => navigate("/register")}>
              + Add User
            </button>
          </div>
        </header>

        <section className="adContent">
          <div className="adGrid">
            <StatCard
              title="Total Books"
              value={loadingStats ? "..." : stats.totalBooks}
              sub="From database"
            />
            <StatCard
              title="Issued Today"
              value={loadingStats ? "..." : stats.issuedToday}
              sub="Today only"
            />
            <StatCard
              title="Overdue"
              value={loadingStats ? "..." : stats.overdue}
              sub="Not returned yet"
            />
            <StatCard
              title="Active Members"
              value={loadingStats ? "..." : stats.activeMembers}
              sub="Status = Active"
            />
          </div>

          <div className="adPanels">
            <div className="adPanel">
              <div className="adPanelHead">
                <div className="adPanelTitle">Quick Actions</div>
                <div className="adPanelSub">Common admin tasks</div>
              </div>

              <div className="adActions">
                <button className="adAction" onClick={() => navigate("/issue-book")}>
                  📤 Issue Book
                  <span>Issue a book to a member</span>
                </button>

                <button className="adAction" onClick={() => navigate("/return-book")}>
                  📥 Return Book
                  <span>Process book returns</span>
                </button>

                <button className="adAction" onClick={() => navigate("/transactions")}>
                  🧾 View Transactions
                  <span>See all issue and return records</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;