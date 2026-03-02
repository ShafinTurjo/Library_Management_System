import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/AdminDashboard.css";

function StatCard({ title, value, sub }) {
  return (
    <div className="adStatCard">
      <div className="adStatTitle">{title}</div>
      <div className="adStatValue">{value || "0"}</div>
      {sub && <div className="adStatSub">{sub}</div>}
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalBooks: 0, totalCards: 0, totalIssued: 0, totalPending: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  useEffect(() => {
    if (!user || String(user.role).toLowerCase() !== "admin") {
      navigate("/login");
      return;
    }

    Promise.all([
      fetch("http://localhost/mssqlproject/getAdminStats.php").then(res => res.json()),
      fetch("http://localhost/mssqlproject/transactionList.php").then(res => res.json())
    ])
    .then(([statsData, activityData]) => {
      setStats(statsData);
      setRecentActivity(activityData.slice(0, 5));
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [user, navigate]);

  if (loading) return <div className="loading-screen">Loading Admin Panel...</div>;

  return (
    <div className="adWrap">
      <aside className="adSidebar">
        <div className="adBrand">
          <div className="adLogo">📚</div>
          <div>
            <div className="adBrandTitle">Library Admin</div>
            <div className="adBrandSub">System Management</div>
          </div>
        </div>
        <nav className="adNav">
          <button className="adNavItem active" onClick={() => navigate("/admin-dashboard")}>🏠 Overview</button>
          <button className="adNavItem" onClick={() => navigate("/addbook")}>📖 Manage Books</button>
          <button className="adNavItem" onClick={() => navigate("/issuecard")}>🪪 Issue New Card</button>
          <button className="adNavItem" onClick={() => navigate("/card-history")}>📜 Library Card History</button>
          <button className="adNavItem" onClick={() => navigate("/transactions")}>💸 Transactions</button>
        </nav>

        
        <div className="adSideFooter">
          <div className="adUserBox" style={{ padding: '10px 12px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', marginBottom: '10px' }}>
            <div className="adUserName" style={{ fontWeight: '800', color: '#e9eefc' }}>
              {user?.name || "Admin"}
            </div>
            <div className="adUserRole" style={{ opacity: '0.7', fontSize: '12px', marginTop: '2px', color: '#e9eefc' }}>
              Administrator
            </div>
          </div>
          <button className="adLogout" onClick={() => { localStorage.clear(); navigate("/login"); }}>
            Logout
          </button>
        </div>
      </aside>

      <main className="adMain">
        <header className="adTopbar">
          <div>
            <div className="adHello">Welcome, {user?.name} 👋</div>
            <div className="adMuted">Real-time status of your library.</div>
          </div>
          <div className="adActions-Top">
             <button className="adBtn" onClick={() => navigate("/addbook")}>+ Add Book</button>
          </div>
        </header>

        <section className="adContent">
          <div className="adGrid">
            <StatCard title="Total Books" value={stats.totalBooks} />
            <StatCard title="Books Issued" value={stats.totalIssued} />
            <StatCard title="Total Cards" value={stats.totalCards} />
            <StatCard title="Overdue" value={stats.totalPending} />
          </div>

          <div className="adPanel">
            <div className="adPanelTitle">Quick Actions</div>
            <div className="adActions">
              <button className="adAction" onClick={() => navigate("/addbook")}>➕ Add Book</button>
              <button className="adAction" onClick={() => navigate("/issuebook")}>📤 Issue Book</button>
              <button className="adAction" onClick={() => navigate("/returnbook")}>📥 Return Book</button>
              <button className="adAction" onClick={() => navigate("/issuecard")}>🪪 Issue Card</button>
            </div>
          </div>

          <div className="adPanel">
            <div className="adPanelTitle">Recent Activity</div>
            <div className="adTableWrap">
              <table className="adTable">
                <thead>
                  <tr><th>User</th><th>Book</th><th>Type</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {recentActivity.map((r, i) => (
                    <tr key={i}>
                      <td>{r.userId}</td>
                      <td>{r.bookName}</td>
                      <td><span className={`badge ${r.type.toLowerCase()}`}>{r.type}</span></td>
                      <td>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;