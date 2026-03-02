import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/MemberDashboard.css";


function StatCard({ title, value, sub }) {
  return (
    <div className="mdCard">
      <div className="mdCardTitle">{title}</div>
      
      <div style={{ fontSize: '24px', fontWeight: '800', margin: '10px 0', color: '#5680ff' }}>
        {value || "0"}
      </div>
      <div className="mdCardSub">{sub}</div>
    </div>
  );
}

function MemberDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ issuedBooks: 0, overdue: 0, dueThisWeek: 0 });

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    
    fetch(`http://localhost/mssqlproject/getMemberStats.php?userId=${user.userId}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats Error:", err));
  }, [user, navigate]);

  return (
    <div className="mdLayout">
      <aside className="mdSidebar">
        <div className="mdBrand">
          <div className="mdLogo">📚</div>
          <div>
            <div className="mdBrandTitle">Member Panel</div>
            <div className="mdBrandSub">Library System</div>
          </div>
        </div>
        
        <nav className="mdNav">
          <button className="mdNavItem active" onClick={() => navigate("/member-dashboard")}>
            🏠 Dashboard
          </button>
          <button className="mdNavItem" onClick={() => navigate("/books")}>
            📖 Book List
          </button>
        </nav>

        <div className="mdSideFooter">
          <div className="mdUserBox">
            <div className="mdUserName">{user?.name || "Member"}</div>
            <div className="mdUserRole">Student / Member</div>
          </div>
          <button className="mdLogout" onClick={() => { localStorage.clear(); navigate("/login"); }}>
            Logout
          </button>
        </div>
      </aside>

      <main className="mdMain">
        <header className="mdTopbar">
          <div>
            <div className="mdHello">Welcome, {user?.name} 👋</div>
            <div className="mdMuted">Check your library activities here.</div>
          </div>
          <button className="mdBtn" onClick={() => navigate("/books")}>Browse Library</button>
        </header>

        <section className="mdContent">
          
          <div className="mdCardsRow">
            <StatCard 
              title="Issued Books" 
              value={stats.issuedBooks} 
              sub="Books you currently have" 
            />
            <StatCard 
              title="Overdue" 
              value={stats.overdue} 
              sub="Action required" 
            />
            <StatCard 
              title="Due This Week" 
              value={stats.dueThisWeek} 
              sub="Check return dates" 
            />
          </div>

          <div className="mdTopbar" style={{ marginTop: '24px', display: 'block' }}>
            <div className="mdCardTitle" style={{ marginBottom: '15px' }}>Quick Actions</div>
            <div className="mdTopActions">
              <button className="mdBtnGhost" onClick={() => navigate("/books")}>🔎 Search Books</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MemberDashboard;