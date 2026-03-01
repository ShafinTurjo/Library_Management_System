import { useEffect, useMemo } from "react";
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



  return (
    <div className="mdLayout">
      {/* Sidebar Navbar */}
      <aside className="mdSidebar">
        <div className="mdBrand">
          <div className="mdLogo">📚</div>
          <div>
            <div className="mdBrandTitle">Member Panel</div>
            <div className="mdBrandSub">{user?.name || "Member"}</div>
          </div>
        </div>

        <nav className="mdNav">
          <button className="mdNavItem active" onClick={() => navigate("/member-dashboard")}>
            Dashboard
          </button>

          <button className="mdNavItem" onClick={() => navigate("/books")}>
            Book List
          </button>

          <button className="mdNavItem" onClick={() => navigate("/library-card")}>
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
            <div className="mdHello">Dashboard</div>
            <div className="mdMuted">Welcome to your member dashboard.</div>
          </div>


        </header>

        <section className="mdContent">
          <div className="mdGrid">
            <StatCard title="Issued Books" value="—" sub="Connect API later" />
            <StatCard title="Overdue" value="—" sub="Connect API later" />
            <StatCard title="Due This Week" value="—" sub="Connect API later" />
            <StatCard title="Card Status" value="—" sub="Connect API later" />
          </div>

          <div className="mdPanel">
            <div className="mdPanelHead">
              <div>
                <div className="mdPanelTitle">Quick Actions</div>
                <div className="mdPanelSub">Go to your pages</div>
              </div>
            </div>

            <div className="mdQuick">
              <button className="mdQuickBtn" onClick={() => navigate("/books")}>
                🔎 Browse books
              </button>
              <button className="mdQuickBtn" onClick={() => navigate("/library-card")}>
                🪪 View library card
              </button>
            </div>

            <div className="mdNote">
              ✅ Dummy book data removed — Book list will be handled by your existing <b>Book.jsx</b>.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MemberDashboard;